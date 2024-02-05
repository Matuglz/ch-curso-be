import { config as configDotenv } from "dotenv";
configDotenv()


export const PORT = process.env.PORT
export const AWS_API_KEY = process.env.AWS_API_KEY
export const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY
export const AWS_REGION = process.env.AWS_REGION

export const AWS_S3_OR = process.env.AWS_S3_OR
export const AWS_S3_OR_SECRET_KEY = process.env.AWS_S3_OR_SECRET_KEY

export const MONGODB_ATLAS_ACCESS_STRING = process.env.MONGODB_ATLAS_ACCESS_STRING

export const SECRET_COOKIE_KEY = process.env.SECRET_COOKIE_KEY

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL

export const GITHUB_APP_ID = process.env.GITHUB_APP_ID
export const GITHUB_APP_CLIENT_ID = process.env.GITHUB_APP_CLIENT_ID
export const GITHUB_APP_CALLBACK_URL = process.env.GITHUB_APP_CALLBACK_URL
export const GITHUB_APP_CLIENT_SECRET = process.env.GITHUB_APP_CLIENT_SECRET

export const GOOGLE_AUTH_APP_CLIENT_ID = process.env.GOOGLE_AUTH_APP_CLIENT_ID
export const GOOGLE_AUTH_APP_SECRET_ID = process.env.GOOGLE_AUTH_APP_SECRET_ID
export const GOOGLE_AUTH_APP_CALLBACK_URL = process.env.GOOGLE_AUTH_APP_CALLBACK_URL