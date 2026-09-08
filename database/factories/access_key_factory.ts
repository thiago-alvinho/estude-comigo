import factory from '@adonisjs/lucid/factories'
import AccessKey from '#models/access_key'
//import { TeamFactory } from '#database/factories/team_factory'

export const AccessKeyFactory = factory
  .define(AccessKey, async ({ faker }) => {
    return {
      key: faker.internet.password(),
      isActive: true
    }
  })
  .build()