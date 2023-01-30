const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
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


const WooCommerce = new WooCommerceRestApi({
    url: 'https://inspelning.xn--webbutvecklare-glimkra-65b.se/',
    consumerKey: 'ck_d68f118bdb17951183ca676f915d59274b51b4da',
    consumerSecret: 'cs_966f5fc9d439f7daa804522f0a5d24dae1c08ccf',
    version: 'wc/v3'
  });

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

app.get("/get-all-products", async (req, res) => {

    WooCommerce.get("products")
    .then((response) => {
      res.json(response.data)
    })
    .catch((error) => {
      console.log(error.response.data);
    });})


    app.post('/stripe-complete', express.raw({type: 'application/json'}), (request, response) => {

      let event = request.body
    
      // Handle the event
      switch (event.type) {
        case 'checkout.session.completed':
          const { payment_status, customer_details } = event.data.object;
          const { email, name } = customer_details

          if(payment_status === 'paid'){
            createWcOrder(email, name)
          }

          break;
        // ... handle other event types
        default:
          console.log(`Unhandled event type ${event.type}`);
      }
    
      // Return a 200 response to acknowledge receipt of the event
      response.send();
    });


function createWcOrder (email, name) {
    console.log('createWcOrder körs')

    const data = {
        payment_method: "Martins stripe integration",
        payment_method_title: "Direct Bank Transfer",
        set_paid: true,
        billing: {
          first_name: name,
          last_name: "Doe",
          address_1: "969 Market",
          address_2: "",
          city: "San Francisco",
          state: "CA",
          postcode: "94103",
          country: "US",
          email: email,
          phone: "(555) 555-5555"
        },
        shipping: {
          first_name: "John",
          last_name: "Doe",
          address_1: "969 Market",
          address_2: "",
          city: "San Francisco",
          state: "CA",
          postcode: "94103",
          country: "US"
        },
        line_items: [
          {
            product_id: 93,
            quantity: 2
          },
          {
            product_id: 22,
            variation_id: 23,
            quantity: 1
          }
        ],
        shipping_lines: [
          {
            method_id: "flat_rate",
            method_title: "Flat Rate",
            total: "10.00"
          }
        ]
      };

      WooCommerce.post("orders", data)
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error.response.data);
  });
}