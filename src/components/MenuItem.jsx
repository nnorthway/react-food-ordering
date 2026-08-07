import { useContext, useState } from "react";
import { currencyFormatter } from "../util/formatting.js";
import CartContext from "../store/CartContext.jsx";

export default function MenuItem({item}) {
  const [cartText,setCartText] = useState("Add to Cart");

  const cartCtx = useContext(CartContext);

  function handleAddToCart() {
    setCartText("Added!");
    const cartTextTimeout = setTimeout(() => {
      setCartText("Add to Cart");
    }, 2000);
    cartCtx.addItem(item);
  }
  return (
    <div className="meal-item" key={item.id}>
        <img src={`http://localhost:3000/${item.image}`} alt={item.name} />
        <div className="meal-item-description">
          <h3>{item.name}</h3>
          <span className="meal-item-price">{currencyFormatter.format(item.price)}</span>
          <p>{item.description}</p>
          <button className="button" onClick={handleAddToCart}>{cartText}</button>
        </div>
    </div>
  );
}