export default function Menu({items, isLoading, addToCart}) {
  return (
    <div id="meals">
      {isLoading && "Menu loading..."}
      {items && items.map((el) => {
        return (
          <div className="meal-item" key={el.id}>
              <img src={`http://localhost:3000/${el.image}`} alt={el.name} />
              <div className="meal-item-description">
                <h3>{el.name}</h3>
                <span className="meal-item-price">{el.price}</span>
                <p>{el.description}</p>
                <button className="button" onClick={() => {addToCart(el.id)}}>Add To Cart</button>
              </div>
          </div>
        )
      })}
    </div>
  );
}