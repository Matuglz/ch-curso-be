import { model, Schema } from "mongoose";
import {randomUUID} from 'node:crypto'


const userSchema = new Schema({
    _id: {type: String, default: randomUUID},
    email: {type: String, require:true,unique: true},
    password:{ type: String, require:true},
    age: {type:Number, require:true},
    name:{type:String, require:true},
    lastName: {type:String, require:true}
},
{
    strict: 'throw',
    versionKey: false,
})

export const userManager = model('users', userSchema)