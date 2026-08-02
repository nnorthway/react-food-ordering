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
      const newCart = [...prevCart, menu.filter((item) => item.id === id)]
      return newCart;
    });
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
        Your Cart
      </Modal>
      <Modal open={checkoutOpen} onClose={toggleCheckout}>
        Checkout
      </Modal>
      <Menu items={menu} isLoading={menuLoading} addToCart={handleAddToCart} />
    </>
  );
}

export default App;
