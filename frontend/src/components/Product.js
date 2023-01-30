export default function Product({ data, setCart, cart }) {
    const {name, price, id} = data

    const addToCart = () => {
        setCart([...cart, {
            id: id,
            name: name,
            price: Number(price)
        }
        ])
    }
    
  return (
    <div>
        <h4>{name} : {price}</h4>
        <button onClick={addToCart}>Lägg {name} i varukorgen</button>
    </div>
  )
}
