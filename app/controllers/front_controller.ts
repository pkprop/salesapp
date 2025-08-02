import type { HttpContext } from '@adonisjs/core/http'
export default class FrontController {

    async home({view}:HttpContext){
        return view.render('home')
    }
}