import { DateTime } from 'luxon'
import { BaseModel, column,beforeCreate } from '@adonisjs/lucid/orm'
import slugifyModule from 'slugify';
const slugify = slugifyModule.default || slugifyModule;

export default class CmsPage extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare user_id: number
  @column()
  declare title: string
  @column()
  declare slug: string
  @column()
  declare content: string
  @column()
  declare image: string
  @column({serializeAs: 'meta_title'})
  declare meta_title: string
  @column({serializeAs: 'meta_description'})
  declare meta_description: string
  @column({serializeAs: 'meta_keywords'})
  declare meta_keywords: string
  @column()
  declare status: boolean
  @column({serializeAs: 'page_status'})
  declare page_status: string
  

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static async assignSlug(item:CmsPage) {
    let slug = await slugify(item?.title, { lower: true, strict: true,trim: true})
    let uniqueSlug = slug;
    let counter = 1;
    while (await this.query().where('slug', uniqueSlug).first()) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }
    item.slug=uniqueSlug
  }
}