import { mongoose } from 'mongoose'
import { config as configDotenv } from "dotenv";
configDotenv()

await mongoose.connect(process.env.MONGODB_ATLAS_ACCESS_STRING)

export { productsManager } from './models/productModel.js'
export { cartsManager } from './models/cartsModel.js'
export { mesageManager } from './models/mesageModel.js'