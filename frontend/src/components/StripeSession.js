export default function StripeSession() {

function startSession () {

    let items = [
        {
          id: 15,
          quantity: 1,
          name: "bulle",
          priceInCents: 3000
        },
        {
          id: 15,
          quantity: 1,
          name: "bulle",
          priceInCents: 3000
        },
        {
          id: 14,
          quantity: 1,
          name: "kaka",
          priceInCents: 2000
        }
      ]

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
