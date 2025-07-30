import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class AuthController {

    async login({request,response,inertia,auth}:HttpContext){
        const { email, password } = request.only(['email', 'password'])
        try {
            const user = await User.findBy('email',email)
            if (!user) {
               return inertia.render('admin/auth/login',{errors:{invalid:'Invalid credentials'}})
            }
             const validateuser = await User.verifyCredentials(email, password)
             await auth.use('web').login(validateuser)
            response.redirect('/admin/dashboard')
        } catch (error) {
            return inertia.render('admin/auth/login',{errors:{invalid:error.message}})
        }
    }

    async createUser(){
        try {
            return await User.create({
                fullName:'Admin',
                email:'admin@propertyxpo.com',
                password:'admin@321'
            })
        } catch (error) {
            return error?.message
        }
        
    }

}