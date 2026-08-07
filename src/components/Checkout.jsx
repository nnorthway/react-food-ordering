import { useContext, useState } from "react";
import Modal from "./Modal.jsx";
import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext";
import { currencyFormatter } from "../util/formatting.js";
import { postData } from "../http.js";

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + (item.quantity * item.price), 0)
  const userProgressCtx = useContext(UserProgressContext);
  const [isLoading,setIsLoading] = useState(false);
  const [error,setError] = useState(null);

  function handleCancel() {
    userProgressCtx.hideCheckout();
  }

  let actions = (
    <>
      <button className="text-button" onClick={handleCancel}>Cancel</button>
      <button className="button">Submit Order</button>
    </>
  )

  if (isLoading) {
    actions = <button className="button" disabled>Submitting Your Order</button>;
  }

  async function checkout(e) {
    e.preventDefault();
    setIsLoading(true);
    const data = new FormData(e.target);
    const submitData = {order:{
      items: cartCtx.items, 
      customer: Object.fromEntries(data.entries())
    }}

    const result = await postData(submitData);
    if (result.status == 201) {
      setIsLoading(false);
      userProgressCtx.hideCheckout()
      userProgressCtx.showSuccess()
      cartCtx.clearCart();
    } else {
      setIsLoading(false);
      setError("There was an issue with your order. Please try again");
      userProgressCtx.showError();
    }
  }

  if (userProgressCtx.progress == "success") {
    return (
      <Modal className="success" open={userProgressCtx.progress == "success"} onClose={userProgressCtx.hideCart}>
        <h2>Success!</h2>
        <p>Your order is on the way</p>
        <div className="order-actions">
          <button className="button" onClick={userProgressCtx.hideCart}>Close</button>
        </div>
      </Modal>
    )
  }

  return (
    <Modal className="checkout" open={userProgressCtx.progress === "checkout"} onClose={handleCancel}>
      <form onSubmit={checkout}>
        <h3>Checkout</h3>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
        <div className="control-row">
          <div className="control">
            <label htmlFor="name">Full Name</label>
            <input type="text" name="name" required />
          </div>
        </div>
        <div className="control-row">
          <div className="control">
            <label htmlFor="email">Email Address</label>
            <input type="email" name="email" required />
          </div>
        </div>
        <div className="control-row">
          <div className="control">
            <label htmlFor="street">Street Address</label>
            <input type="text" name="street" required />
          </div>
        </div>
        <div className="control-row">
          <div className="control">
            <label htmlFor="postal-code">Postal Code</label>
            <input type="text" name="postal-code" required />
          </div>
          <div className="control">
            <label htmlFor="city">City</label>
            <input type="text" name="city" required />
          </div>
        </div>
        <div className="modal-actions">
          {actions}
        </div>
      </form>
    </Modal>
  )
}