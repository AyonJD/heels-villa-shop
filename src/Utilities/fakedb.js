const getFromLocalStorege = () => {
    return JSON.parse(localStorage.getItem('cart'))
}

const addToLocalStorage = id => {
    const cart = getFromLocalStorege()
    //local storage dta k wrap korar jonno 1 ta object declare korte hobe, er vitor sob selected product add korte hobe
    let shoppingCart = {};
    //Local storage er vitor kichu na thakle means !cart hole wrap kora object er vitor incoming id k key r er value set kore dibo one.
    if (!cart) {
        shoppingCart[id] = 1;
    } else {
        //Local storage er vitor kichu thakle seta k wrap kore dibo wrap korar jonno j empty object chilo oita diye. mane wrap kora object  = cart
        shoppingCart = cart;
        //new id ta cart er vitor already thakle seita k dhore tar value 1 baray dibo r na thakle value set kore dibo 1.
        if (shoppingCart[id]) {
            shoppingCart[id] = shoppingCart[id] + 1;
        } else {
            shoppingCart[id] = 1;
        }
    }
    localStorage.setItem('cart', JSON.stringify(shoppingCart))
}

export {getFromLocalStorege, addToLocalStorage}