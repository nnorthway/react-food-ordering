import Header from "./components/Header.jsx";
import Menu from "./components/Menu.jsx";
import Modal from "./components/Modal.jsx";
import Cart from "./components/Cart.jsx";
import Checkout from "./components/Checkout.jsx";
import { useState, useEffect } from "react";
import { fetchMenu, postData } from "./http.js";

function App() {
  const [menuLoading,setMenuLoading] = useState(false);
  const [menu,setMenu] = useState([]);
  const [errorMessage,setErrorMessage] = useState(null);

  const [cart,setCart] = useState([]);
  const [cartOpen,setCartOpen] = useState(false);
  const [cartCount,setCartCount] = useState(0);
  const [cartTotal,setCartTotal] = useState(0);

  const [orderStatus,setOrderStatus] = useState(null);
  const [checkoutOpen,setCheckoutOpen] = useState(false);
  const [loading,setLoading] = useState(false);

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
    const menuItem = menu.filter((item) => item.id === id);
    setCart(prevCart => {
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
    setCartTotal(prevTotal => {
      return prevTotal + parseFloat(menuItem[0].price);
    })
    setCartCount(prevCount => prevCount + 1);
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
    });
    setCartCount(prevCount => prevCount - 1);
    setCartTotal(prevTotal => {
      const menuItem = menu.filter((item) => item.id === id);
      return prevTotal - parseFloat(menuItem[0].price);
    })
  }

  function handleCartToggle() {
    setCartOpen(prevState => !prevState);
  }

  function toggleCheckout() {
    setCheckoutOpen(prevState => !prevState);
  }

  async function checkout(data) {
    setLoading(true);
    const submitData = {order:{
      items: cart, 
      customer: {}
    }}
    for (const [k,v] of data.entries()) {
      submitData.order.customer[k] = v
    }
    const result = await postData(submitData);
    if (result.status == 201) {
      setCart([]);
      setCartTotal(0);
      setCartCount(0);
      handleCartToggle();
      setOrderStatus("Your order is in progress");
      setLoading(false);
    } else {
      setOrderStatus("We're sorry, there was an error with your order, please try again");
      handleCartToggle();
      setLoading(false);
    }
  }

  return (
    <>
      <Header cart={cart} cartCount={cartCount} openCart={handleCartToggle} />
      <Modal open={cartOpen}>
        <Cart 
          addItem={handleAddToCart} 
          deleteItem={handleCartDelete} 
          userCart={cart} 
          total={cartTotal}
          handleCloseClick={handleCartToggle}
          handleConfirm={toggleCheckout} />
      </Modal>
      <Modal open={checkoutOpen}>
        {orderStatus == null && <Checkout handleSubmit={checkout} total={cartTotal} handleCloseClick={toggleCheckout} loading={loading} />}
        {orderStatus != null && <h3>{orderStatus}</h3>}
      </Modal>
      <Menu items={menu} isLoading={menuLoading} addToCart={handleAddToCart} />
    </>
  );
}

export default App;
