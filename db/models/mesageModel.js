import { Schema, model } from "mongoose"
import { randomUUID } from 'node:crypto'

function time() {
    var date = new Date()

    var day = date.getDate()
    var month = date.getMonth() + 1
    var year = date.getFullYear()

    var hours = date.getHours()
    var minutes = date.getMinutes()


    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return `${day}/${month}/${year}-${hours}/${minutes}`
}



 const mesageModel =  new Schema({
    _id: { type: String, default: randomUUID },
    userEmail: { type: String, required: true },
    mesageText: { type: String, required: true },
    date: { type: String, default: time }
},
    {
        strict: 'throw',
        versionKey: false,
    })

export const mesageManager = model('messages', mesageModel)