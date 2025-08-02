import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'cms_pages'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').nullable()
      table.string('title').notNullable()
      table.string('slug').notNullable().unique()
      table.text('content').notNullable()
      table.string('image').nullable()
      table.string('meta_title').nullable()
      table.string('meta_description').nullable()
      table.string('meta_keywords').nullable()
      table.boolean('status').defaultTo(true)
      table.enum('page_status', ['draft', 'published','archived']).defaultTo('published')
      table.timestamp('created_at')
      table.timestamp('updated_at').defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}