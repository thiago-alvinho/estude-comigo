import factory from '@adonisjs/lucid/factories'
import UserTeam from '#models/user_team'
//import { UserFactory } from '#database/factories/user_factory'
//import { TeamFactory } from '#database/factories/team_factory'
//import { AccessKeyFactory } from '#database/factories/access_key_factory'

export const UserTeamFactory = factory
  .define(UserTeam, async () => {
    return {
    }
  })
  .build()