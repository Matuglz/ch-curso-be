import session from 'express-session'
import connectMongo from 'connect-mongo'
import { config as configDotenv } from "dotenv";
configDotenv()

const store = connectMongo.create({
  mongoUrl: process.env.MONGODB_ATLAS_ACCESS_STRING,
  ttl: 60 * 60 * 24
})

export const sessions = session({
  store,
  secret: process.env.SECRET_COOKIE_KEY,
  resave: false,
  saveUninitialized: false
})