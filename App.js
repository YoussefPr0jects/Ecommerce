import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import  {Navbar} from "./components/navbar";
import {Shop} from "./pages/shop/shop";
import {Cart} from "./pages/cart/cart";
import {Aboutus} from "./pages/aboutus/aboutus";
import {Home} from "./pages/home/home";
import {Login} from "./pages/login/login";
import {Signup} from "./pages/signup/signup";
import {Supplier} from "./pages/supplier/supplier";
import {ShopContextProvider} from './context/shop-context';
import { UserProvider } from './components/UserContext';
import {OrderConfirmed} from './pages/order-confirmed/order_confirmed';
import {Footer} from './components/footer';

  

function App() {
  return ( 
  <div className="App">
<UserProvider>
    <ShopContextProvider> 
  <Router>
    <Navbar /> 

    <Routes>
      <Route path="/" element={<Shop />}/>
      <Route path="/cart" element={<Cart />}/>
      <Route path="/home" element={<Home />}/>
      <Route path="/aboutus" element={<Aboutus />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/signup" element={<Signup />}/>
      <Route path="/supplier" element={<Supplier />}/>
      <Route path="/order_confirmed/:orderId" element={<OrderConfirmed />} />
    </Routes>
  
  </Router>
  </ShopContextProvider>
  </UserProvider>

  </div>
  );
}
export default App;
