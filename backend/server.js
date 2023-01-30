const express = require("express")
const app = express()
const cors = require("cors")
app.use(express.json())
app.use(
  cors({
    origin: "http://localhost:3000",
  })
)

app.listen(5000)
console.log('app.listen(5000)')

const STRIPE_PRIVATE_KEY = 'sk_test_51KZXQ8Foq0qfjkNLwv2SiG7gYVwkpz878gB5KLJndEDiwCs3ECEh8Uv6rioYChiT1SuNrWDGKCTzjXJ40mUyn7wc00oYnGs75r'
const CLIENT_URL = 'http://localhost:3000/'

const stripe = require("stripe")(STRIPE_PRIVATE_KEY)

app.post("/create-checkout-session", async (req, res) => {

    const { items } = req.body

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: items.map(item => {
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
              },
              unit_amount: item.priceInCents,
            },
            quantity: item.quantity,
          }
        }),
        success_url: `${CLIENT_URL}success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${CLIENT_URL}`,
      })
      res.json({ url: session.url })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  })