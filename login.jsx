import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './LoginValidation';
import axios from 'axios';
import { useUser } from '../../components/UserContext';
import "./login.css"
import myImage from './one.jpeg'; 
export function Login() {
  var nameDisplay = "Login";
  const { setUser, setCustomerID } = useUser(); 
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    if (errors.email === "" && errors.password === "") {
      axios
        .post("http://localhost:8081/login", values)
        .then((res) => {
          console.log(res.data);
          if (res.data.status === "Success") {
            navigate("/home");
            nameDisplay = res.data.name;
            setUser(res.data.name);
            setCustomerID(res.data.customerId); 
            alert("Welcome Dear " + nameDisplay);
          } else if (res.data.status === "Success Manager") {
            navigate("/supplier");
            nameDisplay = res.data.name;
            setUser(res.data.name);
            alert("Welcome Dear " + nameDisplay);
          } else {
            alert("Please check your email and password!");
          }
        })
        .catch((err) => console.log(err));
    }
  };


    return (
            <div>
            <div className="card" style={{ backgroundColor: '#0000000' }}>
    <h2 className="login-login">Login</h2>
    <form action="" onSubmit={handleSubmit}>
        <div className="card3">
            <label  style={{ textAlign: 'left' }} htmlFor="email"><strong>Email</strong></label>
            <input className="input" onChange={handleInput}  name="email" type="email" placeholder="Enter your email" />
            {errors.email && <span className="text-danger"> {errors.email}</span>}
        
            <label style={{ textAlign: 'left' }} htmlFor="password"><strong>Password</strong></label>
            <input className="input" onChange={handleInput} name="password" type="password" placeholder="Enter your password" />
            {errors.password && <span className="text-danger"> {errors.password}</span>}
        
            <button type="submit" className="btn" >Login</button>
            <Link to="../signup"><button className="btn create-account" >Create Account</button></Link>
        </div>
    </form>
</div>

            <div>
            <img  id="bg" src={myImage} alt="bg" />
            </div>
            </div>

           
           
     
    );
}
