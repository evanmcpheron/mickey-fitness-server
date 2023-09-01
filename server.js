import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import { v4 as uuid } from 'uuid';
import session from 'express-session';

require("dotenv").config();

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


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(
  cors({
    credentials: true,
    origin,
  })
)

const sess = {
  genid() {
    return uuid() // use UUIDs for session IDs
  },
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess))

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

app.use('/v1', require('./v1/Routes/index')(application))

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, async () => {
    console.log(`Server listening on http://localhost:${PORT}`)
  })
}

module.exports = app
