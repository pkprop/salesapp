import Inquiry from '#models/inquiry'
import type { HttpContext } from '@adonisjs/core/http'
//import User from '#models/user'

export default class InquiryController {
    async list({inertia,request}:HttpContext){
        try {

            const page = request.input('page', 1)
            const limit =10
            const inquiries = await Inquiry.query().orderBy('id','desc').paginate(page,limit)
           // console.log(inquiries,'datas')
            return inertia.render('admin/inquiry/list',{inquiries})

        } catch (error) {
            console.log(error?.message,'error')
            return error?.message
        }  
    }

}