/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const AuthController = ()=> import('#controllers/admin/auth_controller')
const DashboardController =()=> import('#controllers/admin/dashboard_controller')

router.get('/csrf-token', async ({ response, request }) => {
    return response.json({ csrfToken: request.csrfToken})
})
router.on('/').renderInertia('front/home')

router.group(() => {
    router.on('/').renderInertia('admin/auth/login')
    router.on('/login').renderInertia('admin/auth/login')
    router.post('/login',[AuthController,'login'])
    //router.get('/create',[AuthController,'createUser'])
     router.group(() => {
        router.get('/dashboard',[DashboardController,'index'])

     }).middleware(middleware.auth())

}).prefix('/admin')
