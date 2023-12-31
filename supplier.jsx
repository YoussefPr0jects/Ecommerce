import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SImage from './supply.jpeg';
import './supplier.css';

export const Supplier = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantityOrdered, setQuantityOrdered] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:8081/suppliers')
      .then(response => setSuppliers(response.data))
      .catch(error => console.error('Error fetching suppliers:', error));
  }, []);

  useEffect(() => {
    if (selectedSupplier) {
      axios.get(`http://localhost:8081/suppliers/${selectedSupplier.supplier_id}/products`)
        .then(response => setProducts(response.data))
        .catch(error => console.error('Error fetching products:', error));
    }
  }, [selectedSupplier]);

  const handleSupplierChange = (event) => {
    const supplierId = parseInt(event.target.value, 10);
    const supplier = suppliers.find(s => s.supplier_id === supplierId);
    setSelectedSupplier(supplier);
    setSelectedProduct(null);
  };

  const handleProductChange = (event) => {
    const productId = parseInt(event.target.value, 10);
    const product = products.find(p => p.productID === productId);
    setSelectedProduct(product);
  };

  const handleOrderSubmit = () => {
    if (!selectedSupplier || !selectedProduct || quantityOrdered <= 0) {
      alert('Please select a supplier, product, and enter a quantity greater than 0');
      return;
    }
  
    if (quantityOrdered > selectedProduct.quantity_supplied) {
      alert(`Quantity ordered (${quantityOrdered}) exceeds the available quantity (${selectedProduct.quantity_supplied})`);
      return;
    }
  
    const orderData = {
      manager_id: 1,
      supplier_id: selectedSupplier.supplier_id,
      product_id: selectedProduct.productID,
      quantity_ordered: quantityOrdered,
    };
    axios.post('http://localhost:8081/place-order', orderData)
      .then(response => {
        alert(response.data.message);
        axios.get('http://localhost:8081/suppliers')
          .then(response => setSuppliers(response.data))
          .catch(error => console.error('Error fetching suppliers:', error));
          window.location.reload();
          window.location.replace('/home');
      })
      .catch(error => console.error('Error placing order:', error));
  };

  return (
    <div className="card6">
      
      <h2 style={{
        fontSize: '50px',
        fontWeight: '600',
        color: '#000000',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        marginBottom: '50px'
        
      }}>Suppliers</h2>


<div className="choices">
      <label className="labels">Select Supplier:</label>
    
  
      <select onChange={handleSupplierChange}>
        <option value="">Select a Supplier</option>
        {suppliers.map(supplier => (
          <option key={supplier.supplier_id} value={supplier.supplier_id}>
            {supplier.supplier_name}
          </option>
        ))}
      </select>
</div>
      {selectedSupplier && (

        <div className="choices">
          <label className="labels">Select Product:</label>
          <select onChange={handleProductChange}>
            <option value="">Select a Product</option>
            {products.map(product => (
              <option key={product.productID} value={product.productID}>
                {product.product_name}
              </option>
            ))}
          </select>

          {selectedProduct && (

            <div className="choices">
              <label className="labels" >Quantity Ordered:</label>
              <input id="label"
                type="number"
                value={quantityOrdered}
                onChange={(e) => setQuantityOrdered(e.target.value)}
              />

              <button id="placeorder" className="choices" onClick={handleOrderSubmit}>Place Order</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
