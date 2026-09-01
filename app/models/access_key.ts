import { AccessKeySchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Team from '#models/team'

/**
 * This table represents a access key to a team.
 * A access key belongs to a team.
 */
export default class AccessKey extends AccessKeySchema {

    @belongsTo(() => Team)
    declare team: BelongsTo<typeof Team>
}