import { useState } from "react";
import { LOGO_URL } from "../utils/constats" ;
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";




const Title = () => (
  <a href="/">
    <img
      className="logo"
      src={LOGO_URL}
      alt="Burger logo"
      title="Food Pal"
    />
   
  </a>
);


const Header = () => {
  // use useState for user logged in or logged out
  const [isLoggedin, setIsLoggedin] = useState(true);

  //selector:(subscribing to the store)
  const cartItems = useSelector((store)=> store.cart.items);
  //console.log(cartItems) ;

  return (
    <div className="header">
      <Title />
      <h1 className="app-name">Taste Pal</h1>
      <div className="nav-items">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/About">About Us</Link>            
          </li>
          <li>
            <Link to="/ContactUs">Contact Us</Link>
            
          </li>
          <li>
            <Link to="/Cart">({cartItems.length}) Item</Link>                       
          </li>
          <li>
            {/* use conditional rendering for login and logout */}
            {isLoggedin ? (
              <button
                className="logout-btn"
                onClick={() => setIsLoggedin(false)}
              >
                Logout
              </button>
            ) : (
              <button className="login-btn" onClick={() => setIsLoggedin(true)}>
                Login
              </button>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;