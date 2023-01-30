export default function Product({ data }) {
    const {name, price, id} = data
  return (
    <div>
        <h4>{name} : {price}</h4>
    </div>
  )
}
