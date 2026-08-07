import Header from "./components/Header.jsx";
import Menu from "./components/Menu.jsx";
import Modal from "./components/Modal.jsx";
import { CartContextProvider } from "./store/CartContext.jsx";
import Cart from "./components/Cart.jsx";
import Checkout from "./components/Checkout.jsx";
import { useState, useEffect } from "react";
import { fetchMenu } from "./http.js";
import { UserContextProvider } from "./store/UserProgressContext.jsx";

function App() {
  const [menuLoading,setMenuLoading] = useState(false);
  const [menu,setMenu] = useState([]);
  const [errorMessage,setErrorMessage] = useState(null);

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

  return (
    <>
      <UserContextProvider>
        <CartContextProvider>
          <Header />
          <Cart />
          <Checkout />
          <Menu items={menu} isLoading={menuLoading} />
          {errorMessage != null && <h2>{errorMessage}</h2>}
        </CartContextProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
