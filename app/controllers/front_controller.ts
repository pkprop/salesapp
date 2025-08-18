import type { HttpContext } from '@adonisjs/core/http'
import Inquiry from '#models/inquiry'
import Newslatter from '#models/newslatter'
import Blog from '#models/blog'
export default class FrontController {

    async home({view}:HttpContext){
        try {
            const blogs = await Blog.query().preload('category').preload('user').where('blog_status', 'published').orderBy('created_at', 'desc').limit(10)
            //console.log(blogs,'blogs')
            return view.render('home',{blogs})
        } catch (error) {
            return view.render('error', { message: 'An error occurred while loading the home page.' })
        }
    }

    async services({view}:HttpContext){
        return view.render('services')
    }
    async performanceMarketing({view}:HttpContext){
        return view.render('performance-marketing')
    }
    async socialMediaMarketing({view}:HttpContext){
        return view.render('social-media-marketing')
    }

    async emailMarketing({view}:HttpContext){
        return view.render('email-marketing')
    }

    async smsMarketing({view}:HttpContext){
        return view.render('sms-marketing')
    }

    async searchEngineOptimization({view}:HttpContext){
        return view.render('search-engine-optimization')
    }

    async ppcManagement({view}:HttpContext){
        return view.render('pay-per-click-management')
    }
    // async influencerMarketing({view}:HttpContext){
    //     return view.render('influencer-marketing')
    // }

    async websiteDesign({view}:HttpContext){

    }

    async websiteDevlopment({view}:HttpContext){
        
    }

    async uiUxDesign({view}:HttpContext){
        
    }

    async gtmIntigration({view}:HttpContext){
        
    }

    async analyticsAudit({view}:HttpContext){
        
    }

    

    



    async contact({view}:HttpContext){
        return view.render('contact')
    }
    async aboutUs({view}:HttpContext){
        return view.render('about')
    }

    async blogs({view}:HttpContext){
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