import Newslatter from '#models/newslatter'
import type { HttpContext } from '@adonisjs/core/http'
//import User from '#models/user'

export default class NewslatterController {
    async list({inertia,request}:HttpContext){
        try {
            const page = request.input('page', 1)
            const limit =10
            const datas = await Newslatter.query().orderBy('id','desc').paginate(page,limit)
            return inertia.render('admin/newslatter/list',{datas})
        } catch (error) {
            return error?.message
        }
        
    }

}