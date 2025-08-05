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
const FrontController = ()=> import('#controllers/front_controller')
const AuthController = ()=> import('#controllers/admin/auth_controller')
const DashboardController =()=> import('#controllers/admin/dashboard_controller')
const CmsController = ()=> import( '#controllers/admin/cms_controller')
const BlogController = ()=> import( '#controllers/admin/blog_controller')

router.get('/csrf-token', async ({ response, request }) => {
    return response.json({ csrfToken: request.csrfToken})
})
router.get('/',[FrontController,'home'])
router.get('/contact-us',[FrontController,'contact'])
router.post('/save-contact',[FrontController,'saveContact'])
router.post('/save-newslatter',[FrontController,'saveNewslatter'])

//save-contact




router.group(() => {

    router.on('/').renderInertia('admin/auth/login').use(middleware.guest())
    router.on('/login').renderInertia('admin/auth/login').use(middleware.guest())
    router.post('/login',[AuthController,'login']).use(middleware.guest())
    router.get('/create',[AuthController,'createUser'])

     router.group(() => {
        router.get('/logout', async ({ auth, response }) => {
            await auth.use('web').logout()
            return response.redirect('/admin')
        })
        
        router.get('/dashboard',[DashboardController,'index'])

        router.get('/pages',[CmsController,'list'])
        router.get('/page/add',[CmsController,'add'])
        router.post('/page/save',[CmsController,'save'])
        router.get('/page/edit/:id',[CmsController,'edit'])
        router.post('/page/update/:id',[CmsController,'update'])
        router.get('/page/change-status/:id', [CmsController, 'changeStatus'])
        router.get('/page/ai-meta/:id?',[CmsController,'aiMeta'])

         router.get('/blog/categories',[BlogController,'listCategory'])
        router.get('/blog/category/add',[BlogController,'addCategory'])
        router.get('/blog/category/edit/:id',[BlogController,'editCategory'])
        router.post('/blog/category/save',[BlogController,'saveCategory'])
        router.post('/blog/category/update',[BlogController,'updateCategory'])
        router.get('/blog/category/change-status/:id', [BlogController, 'changeCategoryStatus'])

        router.get('/blogs',[BlogController,'list'])
        router.get('/blog/add',[BlogController,'add'])
        router.post('/blog/save',[BlogController,'save'])
        router.get('/blog/change-status/:id', [BlogController, 'changeStatus'])
        router.get('/blog/edit/:id',[BlogController,'edit'])
        router.post('/blog/update/:id',[BlogController,'update'])
        router.get('/blog/ai-meta/:id?',[BlogController,'aiMeta'])

     }).middleware(middleware.auth())

}).prefix('/admin')
