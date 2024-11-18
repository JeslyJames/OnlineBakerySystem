import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import removeicon from '../Assets/cart-cross-icon.png'
const CartItems = () => {
    const {getTotalCartAmount,all_product,cartItems,removeFromCart} = useContext(ShopContext);
  return (
    <div className='CartItems'>
        <div className="cartitems-format-main heading">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr/>
      {all_product.map((e)=>{
        if(cartItems[e.ID] > 0){
            return <div>
                <div className="cartitems-format cartitems-format-main">
                    <img src={e.image} alt="" className="carticon-product-icon" />
                    <p>{e.name}</p>
                    <p>${e.price}</p>
                    <button className='cartitems-quantity'>{cartItems[e.ID]}</button>
                    <p>${(e.price*cartItems[e.ID]).toFixed(2)}</p>
                    <img src={removeicon} alt='' className='removeIcon' onClick={()=>{removeFromCart(e.ID)}}/>
                    </div>
                    <hr />
            </div>
        }
        return null;
      })}
      <div className="cartitem-down">
        <div className="cartitems-total">
            <h1>Cart Total</h1>
            <div>
            <div className="cartitems-total-item">
                    <p>Subtotal</p>
                    <p>${getTotalCartAmount()}</p>
                </div>
                <hr/>
                <div className="cartitems-total-item">
                    <p>Shipping Fee</p>
                    <p>Free</p>
                </div>
                <hr/>
                <div className="cartitems-total-item">
                    <p>Total</p>
                    <p>${getTotalCartAmount()}</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default CartItems
