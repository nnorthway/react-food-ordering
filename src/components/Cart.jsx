export default function Cart({userCart, addItem, deleteItem, total, handleCloseClick, handleConfirm}) {
  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <ul>
        {userCart?.map(el => {
          return (
            <li key={el.id} className="cart-item">
              <p>
                {el.name} - ${el.price * el.quantity}
              </p>
              <div className="cart-item-actions">
                <button onClick={() => deleteItem(el.id)}>-</button>
                {el.quantity}
                <button onClick={() => addItem(el.id)}>+</button>
              </div>
            </li>
          )
        })}
        {userCart.length === 0 && "Your cart is empty."}
      </ul>
      <p>${total}</p>
      <div className="modal-actions">
        <button className="text-button" onClick={handleCloseClick}>Cancel</button>
        <button className="button" onClick={handleConfirm}>Checkout</button>
      </div>
    </div>
  )
}