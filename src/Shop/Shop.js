import React, { useState, useEffect } from "react";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  // console.log(cart);

  useEffect(() => {
    fetch("data.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleAddToCart = (selectedProduct) => {
    let newCart = [];
    let quantity = selectedProduct.quantity;
    // console.log(quantity);
    const exists = cart.find(product => product.id == selectedProduct.id)
    if (exists) {
      const rest = cart.filter(product => product.id != selectedProduct.id);
      selectedProduct.quantity = quantity + 1;
      newCart = [...rest, selectedProduct];
    } else {
      selectedProduct.quantity = 1;
      newCart = [...cart, selectedProduct]
    }
    setCart(newCart)
    // const newCart = [...cart, selectedProduct];
    // setCart(newCart);
    // console.log(selectedProduct);
  };
  // console.log(cart);

  const handleClearCart = () => {
    setCart([])
  };

  return (
    <>
      <div className='shop'>
        <div className='products-container'>
          {products.map((product, index) => {
            return (
              <Product
                key={index}
                product={product}
                handleAddToCart={handleAddToCart}
              />
            );
          })}
        </div>
        <div className='cart-container'>
          <Cart
            cart={cart}
            products={products}
            handleClearCart={handleClearCart}
          />
        </div>
      </div>
    </>
  );
};

export default Shop;
