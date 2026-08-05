export default function Checkout({handleSubmit, total, handleCloseClick, loading}) {
  return (
    <form action={handleSubmit}>
      <h3>Checkout</h3>
      <p>Total Amount: ${total}</p>
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
        <button className="text-button" onClick={handleCloseClick}>Cancel</button>
        <button className="button" disabled={loading}>Submit Order</button>
      </div>
    </form>
  )
}