import factory from '@adonisjs/lucid/factories'
import User from '#models/user'
// Dependência circular
//import { UserTeamFactory } from '#database/factories/user_team_factory'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    return {
      fullName: faker.person.fullName(),
      password: faker.internet.password(),
      email: faker.internet.email()
    }
  })
  .relation('userTeams', () => import('#database/factories/user_team_factory').then((m) => m.UserTeamFactory))
  .build()