import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'access_keys'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('team_id')
      .unsigned()
      .references('teams.id')
      .onDelete('CASCADE')
      .withKeyName('acess_keys_teams_id_fk')
      table.string('key').notNullable().unique({ indexName: 'teams_key_unique'})
      table.boolean('is_active').notNullable().defaultTo(true)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}