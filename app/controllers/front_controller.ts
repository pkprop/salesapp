import type { HttpContext } from '@adonisjs/core/http'
import Inquiry from '#models/inquiry'
import Newslatter from '#models/newslatter'
export default class FrontController {

    async home({view}:HttpContext){
        return view.render('home')
    }

    async contact({view}:HttpContext){
        return view.render('contact')
    }

    async saveContact({request,response}:HttpContext){
        try {
            const data = request.only(['name', 'email', 'message', 'phone', 'url'])
            const inquiry = await Inquiry.create(data)
            return response.json({ success: true, message: 'Inquiry saved successfully' })
        } catch (error) {
            return response.status(500).json({ success: false, message: 'Failed to save inquiry', error: error?.message })
        }
    }

    async saveNewslatter({request,response}:HttpContext){
        try {
            const email = request.input('email')
            if (!email) {
                return response.status(400).json({ success: false, message: 'Email is required' })
            }
            const newslatter = await Newslatter.create({ email })
            return response.json({ success: true, message: 'Subscription successful', data: newslatter })
        } catch (error) {
            return response.status(500).json({ success: false, message: 'Failed to subscribe', error: error?.message })
        }
    }
}