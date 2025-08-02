import type { HttpContext } from '@adonisjs/core/http'
import drive from '@adonisjs/drive/services/main'
import { cuid } from '@adonisjs/core/helpers'
import CmsPage from '#models/cms_page'
import AIService from '#services/ai_services'
export default class CmsController {

    async list({inertia,request}: HttpContext){
        try {
            const page = request.input('page', 1)
            const limit =10
            const pages = await CmsPage.query().orderBy('id','desc').paginate(page,limit)
            pages.baseUrl('/admin/pages')
            return inertia.render('admin/cms/list',{pages:pages.serialize()})
        } catch (error) {
            return inertia.render('admin/cms/list',{errors:{invalid:error.message}})
        }
    }
    
    async add({inertia}: HttpContext){
        return inertia.render('admin/cms/add')
    }
    async edit({inertia,params}: HttpContext){
        try {
            const {id}=params
            const page= await CmsPage.query().where({id:id}).first()
            return inertia.render('admin/cms/edit',{
                page:page?.serialize()
            })
        } catch (error) {
            return inertia.render('admin/cms/edit',{
                errors:{invalid:error?.message}
            })
        }
    }

    async save({request,response,auth,inertia}:HttpContext){
        try {
            const data = request.all()
            const image = request.file('image')
            const adminUser = auth.user?.serialize()
            data.user_id = adminUser?.id
            if(image){
                const key = `cms/${cuid()}.${image.extname}`
                await image.moveToDisk(key)
                data.image = await drive.use().getUrl(key)
            }
            await CmsPage.create(data)
            return response.redirect('/admin/pages')
        } catch (error) {
            return inertia.render('admin/cms/add',{invalidError:error.message})
        }
    }
     async update({request,response,auth,inertia,params}:HttpContext){
        try {
            const {id}=params
            const data = request.all()
            const image = request.file('image')
            const adminUser = auth.user?.serialize()
            const page = await CmsPage.findOrFail(id)
            if(image){
                const key = `cms/${cuid()}.${image.extname}`
                await image.moveToDisk(key)
                data.image = await drive.use().getUrl(key)
            }
            page.merge(data)
            await page.save()
            return response.redirect('/admin/pages')
        } catch (error) {
            return inertia.render('admin/cms/edit',{invalidError:error.message})
        }
     }

     async changeStatus({response,params}:HttpContext){
        const {id}=params
        try {
            const data = await CmsPage.findOrFail(id)
            if(data.status){
                data.status = false
            }else{
                data.status = true
            }
            await data.save()
            return response.json({message:'Status changed'})
        } catch (error) {
            return response.status(500).json({ message:error.message })
        }
    }

    async aiMeta({ response,params }: HttpContext){
        try {
            const {id,text}=params
            const product = await CmsPage.query().where('id',id).first()
            const meta = await AIService.pageMeta(product?.title||text)
            return {status:'success',data:JSON.parse(meta?.data||'')}
        } catch (error) {
            return response.status(500).json({status:'error', message:error.message })
        }
    }

}