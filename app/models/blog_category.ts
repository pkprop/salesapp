import { DateTime } from 'luxon'
import { BaseModel, column,beforeCreate,hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import slugifyModule from 'slugify';
import Blog from '#models/blog';
const slugify = slugifyModule.default || slugifyModule;

export default class BlogCategory extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare name: string
  @column()
  declare slug: string
  @column()
  declare icon: string
  @column()
  declare description: string
  @column()
  declare status: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Blog, { foreignKey: 'category_id' })
  public blogs!: HasMany<typeof Blog>

  @beforeCreate()
  static async assignSlug(item:BlogCategory) {
    let slug = await slugify(item?.name, { lower: true, strict: true,trim: true})
    let uniqueSlug = slug;
    let counter = 1;
    while (await this.query().where('slug', uniqueSlug).first()) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }
    item.slug=uniqueSlug
  }
}