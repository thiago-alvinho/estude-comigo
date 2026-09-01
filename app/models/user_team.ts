import { UserTeamSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Team from '#models/team'
import User from '#models/user'
import AccessKey from '#models/access_key'

/**
 * This table represents a relationship between team, user and access key.
 * A user_team instance belongs to a team, an user and an access key.
 */
export default class UserTeam extends UserTeamSchema {

    @belongsTo(() => Team)
    declare team: BelongsTo<typeof Team>
    @belongsTo(() => User)
    declare user: BelongsTo<typeof User>
    @belongsTo(() => AccessKey)
    declare accessKey: BelongsTo<typeof AccessKey>
}