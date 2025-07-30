import type { HttpContext } from '@adonisjs/core/http'
//import User from '#models/user'

export default class DashboardController {
    async index({inertia}:HttpContext){
        try {
            return inertia.render('admin/dashboard')
        } catch (error) {
            return error?.message
        }
        
    }

}