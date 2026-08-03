import Header from "./components/Header.jsx";
import Menu from "./components/Menu.jsx";
import Modal from "./components/Modal.jsx";
import { useState, useEffect } from "react";
import { fetchMenu } from "./http.js";

function App() {
  const [menuLoading,setMenuLoading] = useState(false);
  const [menu,setMenu] = useState([]);
  const [errorMessage,setErrorMessage] = useState(null);

  const [cart,setCart] = useState([]);
  const [cartOpen,setCartOpen] = useState(false);

  const [checkoutOpen,setCheckoutOpen] = useState(false);

  useEffect(() => {
    async function getMenu() {
      setMenuLoading(true);
      try {
        const menu = await fetchMenu();
        setMenu(menu);
      } catch (err) {
        setErrorMessage("Error fetching menu");
      }
      setMenuLoading(false);
    }
    getMenu();
  },[]);

  function handleAddToCart(id) {
    setCart(prevCart => {
      const menuItem = menu.filter((item) => item.id === id);
      const cartItem = cart.filter((item) => item.id === id);
      if (!cartItem.length) {
        const updatedMenuItem = {...menuItem[0], quantity: 1};
        const newCart = [...prevCart, updatedMenuItem];
        return newCart
      } else {
        const updatedMenuItem = {...cartItem[0], quantity: cartItem[0].quantity + 1};
        const newCart = [...prevCart.filter((item) => item.id !== id), updatedMenuItem];
        return newCart;
      }
    });
  }

  function handleCartDelete(id) {
    setCart(prevCart => {
      const cartItem = cart.filter((item) => item.id === id);
      const prevCartCopy = prevCart.filter((item) => item.id !== id);
      if (cartItem.length && cartItem[0].quantity > 1) {
        const updatedItem = {...cartItem[0], quantity: cartItem[0].quantity - 1};
        return [...prevCartCopy, updatedItem];
      } else {
        return prevCartCopy;
      }
    })
  }

  function handleCartToggle() {
    setCartOpen(prevState => !prevState);
  }

  function toggleCheckout() {
    setCheckoutOpen(prevState => !prevState);
  }

  return (
    <>
      <Header cart={cart} cartCount={cart.length} openCart={handleCartToggle} />
      <Modal open={cartOpen} onClose={handleCartToggle}>
        <h2>Your Cart</h2>
        <ul>
          {cart.map((el) => {
            return (
              <li key={el.id} className="cart-item">
                <p>
                  {el.name} - ${el.price * el.quantity}
                </p>
                <div className="cart-item-actions">
                  <button onClick={() => handleCartDelete(el.id)}>-</button>
                  {el.quantity}
                  <button onClick={() => handleAddToCart(el.id)}>+</button>
                </div>
              </li>
            )
          })}
        </ul>
      </Modal>
      <Modal open={checkoutOpen} onClose={toggleCheckout}>
        Checkout
      </Modal>
      <Menu items={menu} isLoading={menuLoading} addToCart={handleAddToCart} />
    </>
  );
}

export default App;
