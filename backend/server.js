const express = require("express")
const app = express()
const cors = require("cors")
app.use(express.json())
app.use(
  cors({
    origin: "http://localhost:3000",
  })
)

const STRIPE_PRIVATE_KEY = 'sk_test_51KZXQ8Foq0qfjkNLwv2SiG7gYVwkpz878gB5KLJndEDiwCs3ECEh8Uv6rioYChiT1SuNrWDGKCTzjXJ40mUyn7wc00oYnGs75r'

const stripe = require("stripe")(STRIPE_PRIVATE_KEY)
