import logo from "../assets/logo.jpg";
export default function Header({cartCount, openCart}) {
  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="Logo" />
        <h1>Reactfood</h1>
      </div>
      <button className="button" onClick={openCart}>
        Cart <span className="cart-count">({cartCount})</span>
      </button>
    </header>
  );
}