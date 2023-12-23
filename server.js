const express = require("express");
const mysql = require("mysql");
const cors = require("cors");


const  app = express();
app.use(cors());
app.use(express.json());
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ecommerce"
})

app.post('/signup', (req, res) =>{
    const sql = "INSERT INTO customer_login(name, email, password) VALUES (?)";
    const values = [ 
        req.body.name,
        req.body.email,
        req.body.password
]
db.query(sql, [values], (err, data) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.json("Error");
    }
    console.log("Row added successfully:", data);
    return res.json(data);
  });
})


app.post('/login', (req, res) => {
    const values = [
        req.body.email,
        req.body.password
    ];

    const customerSql = "SELECT * FROM customer_login WHERE email = ? AND password = ?";
    const managerSql = "SELECT * FROM manager_login WHERE email = ? AND password = ?";

    let responseSent = false;

    db.query(customerSql, values, (err, customerData) => {
        if (err) {
            console.error("Error executing customer_login query:", err);
            if (!responseSent) {
                responseSent = true;
                return res.json("Error");
            }
        } else if (customerData.length > 0) {
            console.log("Success", customerData);
            return res.json({
                status: "Success",
                name: customerData[0].name,
                customerId: customerData[0].cID  
            });
        } else {
            
            db.query(managerSql, values, (err, managerData) => {
                if (err) {
                    console.error("Error executing manager_login query:", err);
                    return res.json("Error");
                } else if (managerData.length > 0) {
                    console.log("Success Manager", managerData);
                    return res.json({
                        status: "Success Manager",
                        name: managerData[0].name,
                        customerId: null  
                    });
                } else {
                    return res.json("Failed");
                }
            });
        }
    });
});

app.post('/shop', (req, res) => {
    const sql = "SELECT * FROM product"; 
    db.query(sql, (err, data) => {
      if (err) { 
        console.error("Error executing product query:", err);
        return res.json("Error");
      } 
      console.log("Retrieved Product", data);
      res.json(data); 
    }); 
  }); 
  app.post('/shop-context', (req, res) => {
    const sql = "SELECT * FROM product"; 
    db.query(sql, (err, data) => {
      if (err) { 
        console.error("Error executing product query:", err);
        return res.json("Error");
      } 
      console.log("Retrieved Product", data);
      res.json(data); 
    }); 
  }); 
   

  
app.post('/checkout', (req, res) => {
    const { customerId, cartItems } = req.body;
  
   
    db.beginTransaction((transactionErr) => {
      if (transactionErr) {
        console.error("Transaction error:", transactionErr);
        return res.json("Error during checkout");
      }

      const orderInsertSql = "INSERT INTO orders (cid, orderDate, totalAmount) VALUES (?, NOW(), ?)";
      const orderValues = [customerId, req.body.totalAmount];
  
      db.query(orderInsertSql, orderValues, (orderInsertErr, orderInsertResult) => {
        if (orderInsertErr) {
          console.error("Error inserting order:", orderInsertErr);
          // rollback eza error
          db.rollback(() => res.json("Error during checkout"));
          return;
        }
  
        const orderId = orderInsertResult.insertId;
  
        // Update product quantities and insert order details
        const orderDetailsInsertSql = "INSERT INTO order_details (orderID, id, quantity) VALUES (?, ?, ?)";
        const productUpdateSql = "UPDATE product SET qty = qty - ? WHERE id = ?";
  
        const updatePromises = Object.entries(cartItems).map(([productId, quantity]) => {
          const productIdNum = Number(productId);
          const quantityNum = Number(quantity);
  
          return new Promise((resolve, reject) => {
            // Check if quantity is greater than 0 before proceeding
            if (quantityNum > 0) {
              // Insert order details
              db.query(orderDetailsInsertSql, [orderId, productIdNum, quantityNum], (err, result) => {
                if (err) {
                  console.error("Error inserting order details:", err);
                  reject(err);
                } else {
                  // Update product quantity
                  db.query(productUpdateSql, [quantityNum, productIdNum], (updateErr) => {
                    if (updateErr) {
                      console.error("Error updating product quantity:", updateErr);
                      reject(updateErr);
                    } else {
                      resolve(result);
                    }
                  });
                }
              });
            } else {
              // eza qty is 0, yaane it wasnt bought so resolve (dont do it for this productid)
              resolve();
            }
          });
        });
  
        // 3mol commit lal transaction if all updates are successful
        Promise.all(updatePromises)
          .then(() => {
            db.commit((commitErr) => {
              if (commitErr) {
                console.error("Error committing transaction:", commitErr);
                return res.json("Error during checkout");
              }
              console.log("Transaction committed successfully");
              res.json({ status: 'Success', orderId });
            });
          })
          .catch(() => {
            // Rollback the transaction eza fi error
            db.rollback(() => res.json("Error during checkout"));
          });
      }); 
    });
  });
  app.get('/suppliers', (req, res) => {
    const query = `
      SELECT
        sp.supplier_id,
        sp.supplier_name,
        MAX(sp.product_id) AS product_id,
        MAX(sp.product_name) AS product_name,
        MAX(sp.quantity_supplied) AS quantity_supplied
      FROM supplier_product sp
      GROUP BY sp.supplier_id, sp.supplier_name
    `;
  
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error executing suppliers query:", err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      console.log("Retrieved Supplier Information for Supply Page", results);
      res.json(results);
    });
  });
  
  
  app.get('/suppliers/:supplierId/products', (req, res) => {
    const { supplierId } = req.params; 
  
    const query = `
      SELECT
        product.id AS productID,
        product.name AS product_name,
        supplier_product.quantity_supplied
      FROM supplier_product
      JOIN product ON supplier_product.product_id = product.id
      WHERE supplier_product.supplier_id = ?
    `;
  
    db.query(query, [supplierId], (err, results) => {
      if (err) {
        console.error("Error executing supplier products query:", err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      console.log("Retrieved Products for Supplier", results);
      res.json(results);
    });
  });
  
  app.post('/place-order', (req, res) => {
    const { manager_id, supplier_id, product_id, quantity_ordered } = req.body;
  
    // Validate the input data (you can add more validation if needed)
    if (!manager_id || !supplier_id || !product_id || !quantity_ordered) {
      return res.status(400).json({ error: 'Invalid input data' });
    }
  
    // Perform any additional validation as needed (e.g., check if the product is available)
  
    // Insert the order into the purchase_orders table
    const orderInsertSql = `
      INSERT INTO purchase_orders (manager_id, supplier_id, product_id, quantity_ordered)
      VALUES (?, ?, ?, ?)
    `;
    const orderValues = [manager_id, supplier_id, product_id, quantity_ordered];
  
    db.beginTransaction((transactionErr) => {
      if (transactionErr) {
        console.error("Transaction error:", transactionErr);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      db.query(orderInsertSql, orderValues, (orderInsertErr, orderInsertResult) => {
        if (orderInsertErr) {
          console.error("Error inserting order:", orderInsertErr);
          // Rollback the transaction in case of an error
          db.rollback(() => res.status(500).json({ error: 'Internal Server Error' }));
          return;
        }
  
        const orderId = orderInsertResult.insertId;
  
        // Update product quantity in the product table
        const productUpdateSql = "UPDATE product SET qty = qty + ? WHERE id = ?";
        db.query(productUpdateSql, [quantity_ordered, product_id], (productUpdateErr) => {
          if (productUpdateErr) {
            console.error("Error updating product quantity:", productUpdateErr);
            // Rollback the transaction in case of an error
            db.rollback(() => res.status(500).json({ error: 'Internal Server Error' }));
            return;
          }
  
          // Update quantity_supplied in the supplier_product table
          const supplierProductUpdateSql = `
            UPDATE supplier_product
            SET quantity_supplied = GREATEST(quantity_supplied - ?, 0)
            WHERE supplier_id = ? AND product_id = ?
          `;
          db.query(supplierProductUpdateSql, [quantity_ordered, supplier_id, product_id], (supplierProductUpdateErr) => {
            if (supplierProductUpdateErr) {
              console.error("Error updating quantity_supplied:", supplierProductUpdateErr);
              // Rollback the transaction in case of an error
              db.rollback(() => res.status(500).json({ error: 'Internal Server Error' }));
              return;
            }
  
            // Commit the transaction if all updates are successful
            db.commit((commitErr) => {
              if (commitErr) {
                console.error("Error committing transaction:", commitErr);
                return res.status(500).json({ error: 'Internal Server Error' });
              }
  
              console.log("Transaction committed successfully");
              res.json({ message: 'Order placed successfully', orderId });
              
            });
          });
        });
      });
    });
  });
  
  
  app.listen(8081, ()=>{
    console.log("Listening")
})   