import factory from '@adonisjs/lucid/factories'
import Team from '#models/team'
//Dependência circular
//import { UserTeamFactory } from '#database/factories/user_team_factory'

export const TeamFactory = factory
  .define(Team, async ({ faker }) => {
    return {
      name: faker.book.title(),
      description: faker.animal.cetacean()
    }
  })
  .relation('userTeams', () => import('#database/factories/user_team_factory').then((m) => m.UserTeamFactory))
  .build()