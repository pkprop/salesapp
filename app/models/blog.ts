import { DateTime } from 'luxon'
import { BaseModel, column,beforeCreate,belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import slugifyModule from 'slugify';
import BlogCategory from '#models/blog_category';
import User from '#models/user';
const slugify = slugifyModule.default || slugifyModule;
export default class Blog extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  @column({serializeAs: 'user_id'})
  declare user_id: number
  @column({serializeAs: 'category_id'})
  declare category_id: number
  @column()
  declare title: string
  @column()
  declare slug: string
  @column()
  declare content: string
  @column({serializeAs: 'meta_title'})
  declare meta_title: string
  @column({serializeAs: 'meta_description'})
  declare meta_description: string
  @column({serializeAs: 'meta_keywords'})
  declare meta_keywords: string
  @column()
  declare image: string
  @column({serializeAs: 'thumb_image'})
  declare thumb_image: string
  @column({serializeAs: 'blog_status'})
  declare blog_status: string
  @column()
  declare tags: string
  @column()
  declare status: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
  
  @belongsTo(() => BlogCategory, { foreignKey: 'category_id' })
  public category!: BelongsTo<typeof BlogCategory>
  @belongsTo(() => User, { foreignKey: 'user_id' })
  public user!: BelongsTo<typeof User>

  @beforeCreate()
    static async assignSlug(item:Blog) {
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