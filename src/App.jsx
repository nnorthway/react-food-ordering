import Header from "./components/Header.jsx";
import Menu from "./components/Menu.jsx";
import { useState, useEffect } from "react";
import { fetchMenu } from "./http.js";

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

  function handleAddToCart(id) {
    console.log(id);
  }

  return (
    <>
      <Header />
      <Menu items={menu} isLoading={menuLoading} addToCart={handleAddToCart} />
    </>
  );
}

export default App;
