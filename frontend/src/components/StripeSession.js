export default function StripeSession({ cart }) {

function startSession () {

    let items = cart.map(item => {
      return {
        id: item.id,
        quantity: 1,
        name: item.name,
        priceInCents: item.price * 100
      }
    })

      fetch('http://localhost:5000/create-checkout-session' , {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({items})
      })
        .then(res => {
            if(res.ok) return res.json()
            return res.json().then(json => Promise.reject(json))
        })
        .then(({ url }) => {
            window.location = url
        })
        .catch(e => {
            console.log(e.error)
        })
}


    
  return (
    <div>
        <button onClick={() => startSession()}>Strarta stripe session</button>
    </div>
  )
}
