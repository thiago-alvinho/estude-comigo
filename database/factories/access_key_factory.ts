import factory from '@adonisjs/lucid/factories'
import AccessKey from '#models/access_key'
// Dependência circular
//import { TeamFactory } from '#database/factories/team_factory'

export const AccessKeyFactory = factory
  .define(AccessKey, async ({ faker }) => {
    return {
      key: faker.internet.password(),
      isActive: true
    }
  })
  .relation('team', () => import('#database/factories/team_factory').then((m) => m.TeamFactory))
  .build()