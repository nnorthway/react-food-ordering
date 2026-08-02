import MenuItem from "./MenuItem.jsx";

export default function Menu({items, isLoading, addToCart}) {  
  return (
    <div id="meals">
      {isLoading && "Menu loading..."}
      {items && items.map((el) => {
        return (
          <MenuItem item={el} addToCart={addToCart} key={el.id} />
        )
      })}
    </div>
  );
}