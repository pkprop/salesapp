import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'blogs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').nullable()
      table.integer('category_id').nullable()
      table.string('title').notNullable()
      table.string('slug').notNullable().unique()
      table.text('content').notNullable()
      table.string('meta_title').nullable()
      table.string('meta_description').nullable()
      table.string('meta_keywords').nullable()
     
      table.string('image').nullable()
      table.string('thumb_image').nullable()
      table.enum('blog_status', ['draft', 'published', 'pending', 'archived', 'scheduled', 'trashed', 'private']).defaultTo('published')
      table.string('tags').nullable()
      table.boolean('status').defaultTo(true) 
      table.timestamp('created_at')
      table.timestamp('updated_at').defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}