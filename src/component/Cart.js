import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ITEM_IMG_CDN_URL } from '../utils/constats';
import { removeItem, clearCart } from '../utils/cartSlice';

const Cart = () => {

    const cartItems = useSelector((store)=> store.cart.items);
    // console.log(cartItems);
  
    const dispatch = useDispatch();
    const handleRemoveItem =(item)=>{
        //dispatch action
        dispatch(removeItem(item));
    }
   const handleClearCart =(item)=>{
        //dispatch action
        dispatch(clearCart(item));
   }
    
  return(cartItems.length==0)?(<div className='empty-ordered-container'>
    <h3>Your Cart is Empty</h3>
    <img src="https://www.kindpng.com/picc/m/289-2892204_your-cart-is-empty-empty-cart-icon-png.png" alt="..." />
  </div>) :(
    <>
    <div className="cart-name"><h1> Cart </h1>
        <div className="ordered-container">
            <button className='clearCart' onClick={()=>handleClearCart()}> Clear Cart</button>
           {cartItems.map((item)=>(
            <div className="order-items"key={item.id}>
                <div className="order-item-details">
                    <h3 className="order-title">{item.name}</h3>
                    <p className="order-cost">₹ {item.price > 0 ? item.price / 100 : "..."}</p>
                    <p className="order-desc">{item.description? item.description : item.category}</p>
                </div>
                <div className="order-img-wrapper">
                    {item.imageId && (
                        <img className='order-item-img'
                        src={ITEM_IMG_CDN_URL + item.imageId}
                        alt={item.name}
                        />
                    )}
                    <button className='remove-btn'onClick={()=>handleRemoveItem(item)} > - remove </button>
                </div>
            </div>
           ))}
        </div>
        </div>
    </>
  )
}

export default Cart