import StripeSession from './components/StripeSession';
import { useState, useEffect } from 'react'
import Product from './components/Product';
import Cart from './components/Cart';

function App() {

useEffect(() => {
  fetch('http://localhost:5000/get-all-products')
    .then(res => res.json())
    .then(data => setProducts(data))
}, [])

const [products, setProducts] = useState()
const [cart, setCart] = useState([])


  return (
    <div>
      <Cart  cart={cart}/>
      {products ? products.map(p => <Product data={p} key={p.id} setCart={setCart} cart={cart} />) : 'laddar produkter' }
      <StripeSession />
    </div>
  );
}

export default App;
