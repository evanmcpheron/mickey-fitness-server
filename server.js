import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieSession from 'cookie-session'
import passport from 'passport'
import connectDB from './v1/Config/db'

const app = express()
app.set('trust proxy', true)
const PORT = process.env.PORT || 8080

const application = {
  app,
}

const origin =
  process.env.NODE_ENV === 'production'
    ? 'https://www.mickeyfitness.com'
    : 'http://localhost:3000'

app.use(
  cookieSession({
    name: 'session',
    signed: false,
    saveUninitialized: true,
    // secure: process.env.NODE_ENV !== 'test',
    secure: false,
  })
)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(
  cors({
    credentials: true,
    origin,
  })
)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Origin', req.headers.origin)
  res.header(
    'Access-Control-Allow-Methods',
    'GET,PUT,POST,DELETE,UPDATE,OPTIONS'
  )
  res.header(
    'Access-Control-Allow-Headers',
    'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
  )
  next()
})

// app.get("/v1/secret", async (req, res) => {
//   const intent = await stripe.paymentIntents.create({
//     amount: 0,
//     currency: "usd",
//     // Verify your integration in this guide by including this parameter
//     metadata: { integration_check: "accept_a_payment" },
//   });

//   res.json({ client_secret: intent.client_secret }); // ... Fetch or create the PaymentIntent
// });

passport.serializeUser((user, cb) => {
  cb(null, user)
})

passport.deserializeUser((obj, cb) => {
  cb(null, obj)
})

app.use('/v1', require('./v1/Routes/index')(application))

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, async () => {
    await connectDB()
    console.log(`Server listening on http://localhost:${PORT}`)
  })
}

module.exports = app
