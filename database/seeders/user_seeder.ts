import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { UserFactory } from '#database/factories/user_factory'
import { TeamFactory } from '#database/factories/team_factory'
import { UserTeamFactory } from '#database/factories/user_team_factory'

export default class extends BaseSeeder {
  async run() {
    const user = await UserFactory.merge({
      email: 'teste@email.com',
      password: '123'
    }).create()

    const teams = await TeamFactory
      .with('accessKeys', 1)
      .createMany(5)
    
    await UserTeamFactory.merge({
      userId: user.id,
      teamId: teams[0].id
    }).create()

    await UserTeamFactory.merge({
      userId: user.id,
      teamId: teams[1].id
    }).create()
  }
}