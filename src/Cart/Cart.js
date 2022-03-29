import React, { useEffect, useState } from "react";
import "./Cart.css";
import { IoTrashBin } from "react-icons/io5";

const Cart = ({ cart, products, handleClearCart }) => {
  const [random, setRandom] = useState({});

  const generateOffer = productsArray => {
    const randomIndex = Math.floor(Math.random() * productsArray.length);
    const randomProduct = products[randomIndex];
    setRandom(randomProduct);
  }
  return (
    <div className='cart'>
      <div className='cart-header'>
        <h1>Order Summery</h1>
        <button
          onClick={handleClearCart}
          className='remove-button'
          title='Clear Cart'
        >
          <IoTrashBin color='white' size={20} />
        </button>
      </div>
      {cart.map((product, index) => (
        <div key={index} className='cart-item'>
          <img src={product.pairImage} alt='' />
          <div>
            <p>
              {product.name} {product.color}
            </p>
            <p>$ {product.price}</p>
            <p>Quantity: { product.quantity }</p>
          </div>
        </div>
      ))}
      <button onClick={() => generateOffer(products)} className="offer-button">
        Get One for Free
      </button>
      {/* Random free product */}
      {
        Object.keys(random).length > 0 && (
          <div className='cart-item'>
            <img src={random.pairImage} alt='' />
            <div>
              <p>
                {random.name} {random.color}
              </p>
              <p>$ {random.price}</p>
            </div>
        </div>
        )
      }
    </div>
  );
};

export default Cart;
