
import type { HttpContext } from '@adonisjs/core/http'
import drive from '@adonisjs/drive/services/main'
import { cuid } from '@adonisjs/core/helpers'
import sharp from 'sharp'
import BlogCategory from '#models/blog_category'
import Blog from '#models/blog'
// import AIService from '#services/ai_services'
import env from '#start/env'
export default class BlogController {

    async listCategory({inertia,request}: HttpContext){
        try {
            const page = request.input('page', 1)
            const limit =10
            const cats = await BlogCategory.query().orderBy('id','desc').paginate(page,limit)
            cats.baseUrl('/admin/blog/categories')
            return inertia.render('admin/blog/category_list',{categories:cats.serialize()})
        } catch (error) {
            return inertia.render('admin/blog/category_list',{errors:{invalid:error.message}})
        }
    }
    async addCategory({inertia}: HttpContext){
        return inertia.render('admin/blog/add_category')
    }
    async editCategory({inertia,params}: HttpContext){
        try {
            const {id} = params
            const blogCategory = await BlogCategory.findOrFail(id)
            return inertia.render('admin/blog/edit_category',{
                category:blogCategory
            })
        } catch (error) {
            return inertia.render('admin/blog/edit_category',{
                error:error?.message
            })
        }
        
    }
    async saveCategory({response,request,inertia}: HttpContext){
        try {
            const data = request.all()
           // const adminUser = auth.user?.serialize()
            const icon = request.file('icon', {
                size: '2mb',
                extnames: ['jpeg', 'jpg', 'png','webp','svg'],
            })
            //data.user_id = adminUser?.id
            if(icon){
                const icon_key = `blog_category/icons/${cuid()}.${icon.extname}`
                await icon.moveToDisk(icon_key)
                data.icon = await drive.use().getUrl(icon_key)
            }
            await BlogCategory.create(data)
            return response.redirect('/admin/blog/categories')
        } catch (error) {
            return inertia.render('admin/blog/add_category',{invalidError:error.message})
        }
    }
     async updateCategory({response,request,inertia}: HttpContext){
        try {
            const data = request.all()
           // const adminUser = auth.user?.serialize()
            const blogCategory = await BlogCategory.findOrFail(data?.id)
            const icon = request.file('icon', {
                size: '2mb',
                extnames: ['jpeg', 'jpg', 'png','webp','svg'],
            })
            //data.user_id = adminUser?.id
            if(icon){
                const icon_key = `blog_category/icons/${cuid()}.${icon.extname}`
                await icon.moveToDisk(icon_key)
                data.icon = await drive.use().getUrl(icon_key)
            }
            blogCategory.merge(data)
            await blogCategory.save()
            return response.redirect('/admin/blog/categories')
        } catch (error) {
            return inertia.render('admin/blog/update_category',{invalidError:error.message})
        }
    }
    async changeCategoryStatus({params,response}: HttpContext){
        const {id}=params
        try {
            const data = await BlogCategory.findOrFail(id)
            if(data.status){
                data.status = 0
            }else{
                data.status = 1
            }
            await data.save()
            return response.json({message:'Status changed'})
        } catch (error) {
            return response.status(500).json({ message:error.message })
        }
    }

    async getBlogCategories({response}: HttpContext){
        try {
            const cats = await BlogCategory.query().where('status',1).select('id','name')
            return response.json(cats)
        } catch (error) {
            return response.status(500).json({ message:error.message })
        }
    }

    async list({inertia,request}: HttpContext){
        try {
            const page = request.input('page', 1)
            const limit =10
            const blogs = await Blog.query().preload('category').orderBy('id','desc').paginate(page,limit)
            blogs.baseUrl('/admin/blogs')
            return inertia.render('admin/blog/list',{blogs:blogs.serialize()})
        } catch (error) {
            return inertia.render('admin/blog/list',{errors:{invalid:error.message}})
        }
    }
    
    async add({inertia}: HttpContext){
        try {
            const cats = (await BlogCategory.query().where('status',1).select('id','name')).map((cat)=>{
                return {value:cat.id,label:cat.name}
            })
            return inertia.render('admin/blog/add',{categories:cats})
        } catch (error) {
            return inertia.render('admin/blog/add',{errors:{invalid:error.message}})
        }
    }

    async edit({inertia,params}: HttpContext){
        try {
            const {id} = params
            const cats = (await BlogCategory.query().where('status',1).select('id','name')).map((cat)=>{
                return {value:cat.id,label:cat.name}
            })
            const blog = await Blog.findOrFail(id)
            return inertia.render('admin/blog/edit',{categories:cats,blog:blog.serialize()})
        } catch (error) {
            return inertia.render('admin/blog/edit',{errors:{invalid:error.message}})
        }
    }

    async save({request,response,auth,inertia}:HttpContext){
        try {
            const data = request.all()
            const image = request.file('image')
            const adminUser = auth.user?.serialize()
            data.user_id = adminUser?.id
            if(image){
                const key = `blog/${cuid()}.${image.extname}`
                const thumb_file_path = `blog/thumb/`
                const thumb_file = `thumb-${cuid()}.${image.extname}`
                let imageBuffer = await sharp(image.tmpPath!).resize(510, 230).toBuffer() 
                await drive.use().put(`${thumb_file_path+thumb_file}`, imageBuffer,{
                    visibility: 'public'
                })
                await image.moveToDisk(key)
                data.image = await drive.use().getUrl(key)
                data.thumb_image = await drive.use().getUrl(`${thumb_file_path+thumb_file}`)
            }
            await Blog.create(data)
            // let blogVariables = 'homeblogs'
            // if(env.get('NODE_ENV')== 'development' ){
            //     blogVariables = 'homeblogs_dev'
            // }
            // const blogs = await Blog.query().preload('category').preload('user').orderBy('id','desc').where('status',true).limit(5)
            // await redis.set(blogVariables,JSON.stringify(blogs))
            return response.redirect('/admin/blogs')
        } catch (error) {
            return inertia.render('admin/blog/add',{invalidError:error.message})
        }
    }

     async update({request,response,auth,inertia,params}:HttpContext){
        try {
            const {id}=params
            const data = request.all()
            const image = request.file('image')
            const adminUser = auth.user?.serialize()
            data.user_id = adminUser?.id
            const blog = await Blog.findOrFail(id)
            if(image){
                const key = `blog/${cuid()}.${image.extname}`
                const thumb_file_path = `blog/thumb/`
                const thumb_file = `thumb-${cuid()}.${image.extname}`
                let imageBuffer = await sharp(image.tmpPath!).resize(510, 230).toBuffer() 
                await drive.use().put(`${thumb_file_path+thumb_file}`, imageBuffer,{
                    visibility: 'public'
                })
                await image.moveToDisk(key)
                data.image = await drive.use().getUrl(key)
                data.thumb_image = await drive.use().getUrl(`${thumb_file_path+thumb_file}`)
            }
            blog.merge(data)
            await blog.save()
            // let blogVariables = 'homeblogs'
            // if(env.get('NODE_ENV')== 'development' ){
            //     blogVariables = 'homeblogs_dev'
            // }
            // const blogs = await Blog.query().preload('category').preload('user').orderBy('id','desc').where('status',true).limit(5)
            // await redis.set(blogVariables,JSON.stringify(blogs))
            return response.redirect('/admin/blogs')
        } catch (error) {
            return inertia.render('admin/blog/edit',{invalidError:error.message})
        }
    }

     async changeStatus({response,params}:HttpContext){
        const {id}=params
        try {
            const data = await Blog.findOrFail(id)
            if(data.status){
                data.status = false
            }else{
                data.status = true
            }
            await data.save()
            // let blogVariables = 'homeblogs'
            // if(env.get('NODE_ENV')== 'development' ){
            //     blogVariables = 'homeblogs_dev'
            // }
            // const blogs = await Blog.query().preload('category').preload('user').orderBy('id','desc').where('status',true).limit(5)
            // await redis.set(blogVariables,JSON.stringify(blogs))
            return response.json({message:'Status changed'})
        } catch (error) {
            return response.status(500).json({ message:error.message })
        }
    }

}