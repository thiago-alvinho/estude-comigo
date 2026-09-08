import type { HttpContext } from '@adonisjs/core/http'
import Team from '#models/team'

export default class TeamsController {
    async index({ view, auth, response }: HttpContext) {
        const teams = await Team.query().orderBy('name', 'asc')
        const user = auth.user!
        const enrolledTeams = await user.related('userTeams').query()
        const enrolledTeamIds = enrolledTeams.map((userTeam) => userTeam.teamId)

        return response.json({ teams: teams, enrolledTeamIds: enrolledTeamIds})
    }

    async myTeams({ view, auth, response }: HttpContext) {
        const user = auth.user!
        const userJson = user.toJSON()
        const userTeams = await user
            .related('userTeams')
            .query()
            .join('teams', 'user_teams.team_id', 'teams.id')
            .select('user_teams.*')
            .preload('team')
            .orderBy('teams.name', 'asc')

        response.json({ user: userJson, userTeam: userTeams})
    }
}