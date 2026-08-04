import Header from "./components/Header.jsx";
import Menu from "./components/Menu.jsx";
import Modal from "./components/Modal.jsx";
import Cart from "./components/Cart.jsx";
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
      const cartItemIndex = prevCart.findIndex((item) => item.id === id);
      if (cartItemIndex === -1) {
        menuItem[0].quantity = 1;
        return [...prevCart, menuItem[0]];
      } else {
        const copy = prevCart.filter((item) => item.id !== id);
        const updatedItem = {...prevCart[cartItemIndex], quantity: prevCart[cartItemIndex].quantity + 1};
        copy.splice(cartItemIndex, 0, updatedItem);
        return copy;
      }
    });
  }

  function handleCartDelete(id) {
    setCart(prevCart => {
      const cartItemIndex = prevCart.findIndex((item) => item.id === id);
      const copy = prevCart.filter((item) => item.id !== id);
      if (prevCart[cartItemIndex].quantity > 1) {
        const updatedItem = {...prevCart[cartItemIndex], quantity: prevCart[cartItemIndex].quantity - 1};
        copy.splice(cartItemIndex, 0, updatedItem);
      } 
      return copy;
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
      <Header cart={cart} cartCount={cart?.length} openCart={handleCartToggle} />
      <Modal open={cartOpen} onClose={handleCartToggle}>
        <Cart 
          addItem={handleAddToCart} 
          deleteItem={handleCartDelete} 
          userCart={cart} />
      </Modal>
      <Modal open={checkoutOpen} onClose={toggleCheckout}>
        Checkout
      </Modal>
      <Menu items={menu} isLoading={menuLoading} addToCart={handleAddToCart} />
    </>
  );
}

export default App;
