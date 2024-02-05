import { getTicketsDao } from "../daos/ticket.dao.mongoose.js";


const ticketDao = await getTicketsDao()

class ticketServices{
    async makeTicket(body){
        return await  ticketDao.create(body)
    }
}


export const ticketSerice = new ticketServices()
