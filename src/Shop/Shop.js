import React, { useState, useEffect } from "react";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import { addToLocalStorage, getFromLocalStorege } from "../Utilities/fakedb";
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

  // Local storage load---------->
  useEffect(() => {
    //Step -1) Get the local storage data
    const localData = getFromLocalStorege();

    //Step -2) Local storage theke jehetu id er name r quantity paschi tai id er name theke product ta khuje ber kore product gulo k 1 ta array te rakhte hobe, tai 1 ta empty array banate hobe.
    const localStorageProduct = [];

    //Step -3) local storage theke paoa id gulo diye oi product gula bar korte hobe. Jehetu id qnique tai find use korte hobe cause full products array er vitor same id 2 ta nai.
    //Jehetu local storage er theke j data paschi seita object akare asche tai loop caliya data theke id ta bar kore niye tarpore find korte hobe.
    for (const id in localData) {
      const matchedProduct = products.find(product => product.id === id);
      
      //Step -4) Jodi local storage thake kono product paoa jay tobe matchedProduct paoa jabe alada alada object hisabe. Jodi product paoa jay tobe local storage theke paoa data er vitor j id ache oita diye quantity k access kore match kora product gular quantity set kore dite hobe.
      if (matchedProduct) {
        matchedProduct.quantity = localData[id]
        localStorageProduct.push(matchedProduct)
      }
    }
    setCart(localStorageProduct)
  }, [products])

  const handleAddToCart = (selectedProduct) => {
    let newCart = [];
    let quantity = selectedProduct.quantity;
    // console.log(quantity);
    const exists = cart.find(product => product.id === selectedProduct.id)
    if (exists) {
      const rest = cart.filter(product => product.id !== selectedProduct.id);
      selectedProduct.quantity = quantity + 1;
      newCart = [...rest, selectedProduct];
    } else {
      selectedProduct.quantity = 1;
      newCart = [...cart, selectedProduct]
    }
    setCart(newCart);

    // <-----------------------------------Local Storege-------------------------------->
    //Adding product id and quantity to local storage
    addToLocalStorage(selectedProduct.id);
    //Getting product id and quantity from local storage-----see top useEffect
  };

  const handleClearCart = () => {
    setCart([]);
    //Removing the local storage data while clicking the delete all button
    localStorage.removeItem('cart');
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
