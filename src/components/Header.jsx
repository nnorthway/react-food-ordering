import { useContext } from "react";
import logo from "../assets/logo.jpg";
import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext";

export default function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartCount = cartCtx.items.reduce((total, item) => {
    return total + item.quantity
  }, 0);

  function handleShowCart() {
    userProgressCtx.showCart();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="Logo" />
        <h1>Reactfood</h1>
      </div>
      <button className="button" onClick={handleShowCart}>
        Cart <span className="cart-count">({cartCount})</span>
      </button>
    </header>
  );
}