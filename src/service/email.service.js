import nodemailer from 'nodemailer'
import { EMAIL_PASS, EMAIL_USER } from '../config/config.js'

class emailServices {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            auth: {
                user: EMAIL_USER,
                pass: EMAIL_PASS
            }
        })
    }

    async sendEmail(email, id) {
        try{
            let emailOptions = {
                from: EMAIL_USER,
                to: email,
                subject: 'Autorizacion',
                text: `http://localhost:8080/AuthEmail`
            }
            await this.transporter.sendMail(emailOptions)
        }catch(error){
            throw new Error(error)
        }
    }

    async sendResetPasswordEmail(email, text){
        try{
            let emailOptions = {
                from: EMAIL_USER,
                to: email,
                subject: 'RESET PASSWORD',
                text: text
            }
            await this.transporter.sendMail(emailOptions)
        }catch(error){
            throw new Error(error)
        }
    }
}

export const emailService = new emailServices()