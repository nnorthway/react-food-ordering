import { useContext } from "react";
import Modal from "./Modal.jsx";
import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import { currencyFormatter } from "../util/formatting.js";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + (item.quantity * item.price), 0)
  const userProgressCtx = useContext(UserProgressContext);

  function handleClose() {
    userProgressCtx.hideCart();
  }

  function handleCheckout() {
    userProgressCtx.hideCart();
    userProgressCtx.showCheckout();
  }

  function deleteItem(id) {
    cartCtx.removeItem(id);
  }

  function addItem(item) {
    cartCtx.addItem(item);
  }

  return (
    <Modal className="cart" open={userProgressCtx.progress == "cart"} onClose={userProgressCtx.progress == "cart" ? handleClose : null}>
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items?.map(el => {
          return (
            <li key={el.id} className="cart-item">
              <p>
                {el.name} - {currencyFormatter.format(el.price * el.quantity)}
              </p>
              <div className="cart-item-actions">
                <button onClick={() => deleteItem(el.id)}>-</button>
                {el.quantity}
                <button onClick={() => addItem(el)}>+</button>
              </div>
            </li>
          )
        })}
        {cartCtx.items.length === 0 && "Your cart is empty."}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <div className="modal-actions">
        <button className="text-button" onClick={handleClose}>Close</button>
        {cartCtx.items.length > 0 && <button className="button" onClick={handleCheckout}>Go to Checkout</button>}
      </div>
    </Modal>
  )
}