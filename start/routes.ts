/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const AuthController = ()=> import('#controllers/admin/auth_controller')


router.on('/').renderInertia('front/home')

router.group(() => {
    router.on('/').renderInertia('admin/auth/login')
    router.on('/login').renderInertia('admin/auth/login')
    router.post('/login',[AuthController,'login'])
}).prefix('/admin')
