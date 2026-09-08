import factory from '@adonisjs/lucid/factories'
import Team from '#models/team'
import { UserTeamFactory } from '#database/factories/user_team_factory'
import { AccessKeyFactory } from '#database/factories/access_key_factory'

export const TeamFactory = factory
  .define(Team, async ({ faker }) => {
    return {
      name: faker.book.title(),
      description: faker.animal.cetacean()
    }
  })
  .relation('userTeams', () => UserTeamFactory)
  .relation('accessKeys',() =>AccessKeyFactory)
  .build()