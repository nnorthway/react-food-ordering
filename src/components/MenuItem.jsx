import { useState } from "react";

export default function MenuItem({item,addToCart}) {
  const [cartText,setCartText] = useState("Add to Cart");

  function handleAddToCart(id) {
    setCartText("Added!");
    const cartTextTimeout = setTimeout(() => {
      setCartText("Add to Cart");
    }, 2000);
    addToCart(id);
  }
  return (
    <div className="meal-item" key={item.id}>
        <img src={`http://localhost:3000/${item.image}`} alt={item.name} />
        <div className="meal-item-description">
          <h3>{item.name}</h3>
          <span className="meal-item-price">{item.price}</span>
          <p>{item.description}</p>
          <button className="button" onClick={() => {handleAddToCart(item.id)}}>{cartText}</button>
        </div>
    </div>
  );
}