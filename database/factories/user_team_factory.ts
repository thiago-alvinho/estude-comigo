import factory from '@adonisjs/lucid/factories'
import UserTeam from '#models/user_team'

// Problema de dependência circular
//import { UserFactory } from '#database/factories/user_factory'
//import { TeamFactory } from '#database/factories/team_factory'
//import { AccessKeyFactory } from '#database/factories/access_key_factory'

export const UserTeamFactory = factory
  .define(UserTeam, async () => {
    return {
    }
  })
  .relation('user', () => import('#database/factories/user_factory').then((m) => m.UserFactory))
  .relation('team', () => import('#database/factories/team_factory').then((m) => m.TeamFactory))
  .relation('accessKey', () => import('#database/factories/access_key_factory').then((m) => m.AccessKeyFactory))
  .build()