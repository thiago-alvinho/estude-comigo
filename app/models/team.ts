import { TeamSchema } from '#database/schema'
import { hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import AccessKey from '#models/access_key'
import UserTeam from '#models/user_team'

/**
 * This table represents a team on the plataform 'Estude Comigo'.
 * A team has many access keys and user_team.
 */
export default class Team extends TeamSchema {
    @hasMany(() => AccessKey)
    declare accessKeys: HasMany<typeof AccessKey>

    @hasMany(() => UserTeam)
    declare userTeams: HasMany<typeof UserTeam>

}