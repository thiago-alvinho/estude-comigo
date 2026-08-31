import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_teams'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id')
      .unsigned()
      .references('users.id')
      .onDelete('CASCADE')
      table.integer('team_id')
      .unsigned()
      .references('teams.id')
      .onDelete('CASCADE')
      table.integer('access_key_id')
      .references('access_keys.id')
      .onDelete('SET NULL')
      .nullable()
      table.timestamp('created_at')
      table.unique(['user_id', 'team_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}