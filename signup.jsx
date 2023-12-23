import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import '../login/login.css';
import {Link} from "react-router-dom";
import Validation from "./SignupValidation";
import axios from "axios";
import Image from './one.jpeg'; 
export const Signup = () => {
        const [values, setValues] = useState({
            name: '',
            email: '',
            password: ''
    
    })
    const navigate = useNavigate();
    const [errors, setErrors]=useState({})
    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: event.target.value}))
    }  
    const handleSubmit = (event) => {
        event.preventDefault(); 
        setErrors(Validation(values));
        if(errors.name === "" && errors.email === "" && errors.password === ""){
            axios.post("http://localhost:8081/signup", values)
            .then(res => {
                navigate("/login");
            })
            .catch(err => console.log(err))
        } 
    }
    return (
        <div >
        <div className="card" style={{ backgroundColor: '#0000000' }}>
            <h2 className="login-login">Sign-Up</h2>
            <form action="" onSubmit={handleSubmit}> 
            <div className = "card3">
                <label style={{textAlign: 'left' }} htmlFor="name"><strong>Name</strong></label>
                <input onChange={handleInput} className="input" type="name" name = "name" placeholder = "Enter your name"/>
                {errors.name && <span className="text-danger" style={{ textAlign: 'left', marginTop: '-15px' }}>{errors.name}</span>}
                
                <label  style={{textAlign: 'left' }} htmlFor="email"><strong>Email</strong></label>
                <input onChange={handleInput} className="input" name="email" type="email" placeholder = "Enter your email"/>
                {errors.email && <span className="text-danger" style={{ textAlign: 'left', marginTop: '-15px' }}> {errors.email}</span>}
               
                
                <label style={{textAlign: 'left'}} htmlFor="password"><strong>Password</strong></label>
                <input  onChange={handleInput} className="input" name ="password" type="password" placeholder = "Enter your password"/>
                {errors.password && <span className="text-danger" style={{ textAlign: 'left', marginTop: '-15px' }}> {errors.password}</span>}
              
               <button className="btn">Create Account</button> 
                
                <Link to ="../login"><button className="btn create-account ">Already have an account? Login</button>  </Link>

                </div>
            </form>
        </div>
        <div>
            <img  id="bg" src={Image} alt="bg" />
            </div>
    </div>
    );
}; 
    