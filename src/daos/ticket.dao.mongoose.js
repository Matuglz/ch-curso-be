import { Schema, model, mongoose } from "mongoose";
import { randomUUID } from 'node:crypto'
import { getTime, randomCode } from "../functions/utils.js";

const ticketSchema = new Schema({
    _id: { type: String, default: randomUUID },
    code: { type: String, default: randomCode },
    pucharse_dateTime: { type: String, default: getTime },
    products: { type: Array, required: true },
    amount: { type: Number, required: true },
    pucharser: { type: String, require: true }
}, {
    strict: 'throw',
    versionKey: false,
    statics: {}
})

const ticketModel = model('tickets', ticketSchema)

class ticketsDao{
    async create(body){
        const ticket = await ticketModel.create(body)
        return ticket.toObject()
    }
}


export async function getTicketsDao() {
    let ticketDao
    return ticketDao = new ticketsDao()
}