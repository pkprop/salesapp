import type { HttpContext } from '@adonisjs/core/http'
import Inquiry from '#models/inquiry'
import Newslatter from '#models/newslatter'
import Blog from '#models/blog'
import BlogCategory from '#models/blog_category'
import CmsPage from '#models/cms_page'
export default class FrontController {

    async home({view}:HttpContext){
        try {
            const blogs = await Blog.query().preload('category').preload('user').where('blog_status', 'published').orderBy('created_at', 'desc').limit(10)
            const page = await CmsPage.query().where('slug','home').first()
            //console.log(blogs,'blogs')
            return view.render('home',{blogs,page})
        } catch (error) {
            return view.render('error', { message: 'An error occurred while loading the home page.' })
        }
    }

    async services({view}:HttpContext){
        const page = await CmsPage.query().where('slug','services').first()
        return view.render('services',{page})
    }
    async performanceMarketing({view}:HttpContext){
        const page = await CmsPage.query().where('slug','performance-marketing').first()
        return view.render('performance-marketing',{page})
    }
    async socialMediaMarketing({view}:HttpContext){
        const page = await CmsPage.query().where('slug','social-media-marketing').first()
        return view.render('social-media-marketing',{page})
    }

    async emailMarketing({view}:HttpContext){
        const page = await CmsPage.query().where('slug','email-marketing').first()
        return view.render('email-marketing',{page})
    }

    async smsMarketing({view}:HttpContext){
        const page = await CmsPage.query().where('slug','sms-marketing').first()
        return view.render('sms-marketing',{page})
    }

    async searchEngineOptimization({view}:HttpContext){
        const page = await CmsPage.query().where('slug','search-engine-optimization').first()
        return view.render('search-engine-optimization',{page})
    }

    async ppcManagement({view}:HttpContext){
        const page = await CmsPage.query().where('slug','pay-per-click-management').first()
        return view.render('pay-per-click-management',{page})
    }
    // async influencerMarketing({view}:HttpContext){
    //     return view.render('influencer-marketing')
    // }

    async websiteDesign({view}:HttpContext){
        const page = await CmsPage.query().where('slug','website-design').first()
        return view.render('website-design',{page})
    }

    async websiteDevlopment({view}:HttpContext){
        const page = await CmsPage.query().where('slug','website-devlopment').first()
        return view.render('wedsite-development',{page})
    }

    async uiUxDesign({view}:HttpContext){
        const blogs = await Blog.query().preload('category').preload('user').where('blog_status', 'published').orderBy('created_at', 'desc').limit(10)
        const page = await CmsPage.query().where('slug','ui-ux-design').first()
        return view.render('ui-ux-design',{blogs,page})
    }

    async gtmIntigration({view}:HttpContext){
        const page = await CmsPage.query().where('slug','gtm-intigration').first()
        return view.render('gtm-intigration',{page})
    }

    async analyticsAudit({view}:HttpContext){
        const page = await CmsPage.query().where('slug','analytics-audit').first()
        return view.render('analytics-audit',{page})
    }

    async contentWriting({view}:HttpContext){
        const page = await CmsPage.query().where('slug','content-writing').first()
        return view.render('content-writing',{page})
    }

    async videosMarketing({view}:HttpContext){
        const page = await CmsPage.query().where('slug','videos-marketing').first()
        return view.render('videos',{page})
    }

    async contact({view}:HttpContext){
        const page = await CmsPage.query().where('slug','contact-us').first()
        return view.render('contact',{page})
    }
    async aboutUs({view}:HttpContext){
        const page = await CmsPage.query().where('slug','about-us').first()
        return view.render('about',{page})
    }

    async blogs({view,request}:HttpContext){
         try {
            const page = request.qs()?.page||1
            const limit=10
            const blogs = await Blog.query().preload('category').preload('user').where('blog_status', 'published').orderBy('created_at', 'desc').paginate(page,limit)
            const categories = await BlogCategory.query().withCount('blogs').where('status',1)
            const pageData = await CmsPage.query().where('slug','blog').orWhere('slug','blogs').first()
            return view.render('blog',{blogs,categories,page:pageData})
         } catch (error) {
            return view.render('error', { message: 'An error occurred while loading the home page.' })
         }
        
    }

     async blogDeatil({view,request}:HttpContext){
        try {
            const { slug } = request.params()
            const blog = await Blog.query().preload('category').preload('user').where('slug',slug).first()
             const categories = await BlogCategory.query().withCount('blogs').where('status',1)
            return view.render('blog-detail',{blog,categories})
        } catch (error) {
            return view.render('error', { message: 'An error occurred while loading the home page.' })
        }
       
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
            const [localPart, domain] = email.split("@");
            const newslatter = await Newslatter.create({ email,name:localPart })
            return response.json({ success: true, message: 'Subscription successful', data: newslatter })
        } catch (error) {
            return response.status(500).json({ success: false, message: 'Failed to subscribe', error: error?.message })
        }
    }

    async termsConditions({view,request}:HttpContext) {
        const page = await CmsPage.query().where('slug','terms-conditions').first()
        return view.render('terms',{page})
    }
    async privacyPolicy({view,request}:HttpContext) {
        const page = await CmsPage.query().where('slug','privacy-policy').first()
        return view.render('privacy',{page})
    }
}