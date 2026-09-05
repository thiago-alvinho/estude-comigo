import type { HttpContext } from '@adonisjs/core/http'
import Team from '#models/team'

export default class TeamsController {
    async index({ view, auth }: HttpContext) {
        try {
            const teams = await Team.query().orderBy('name', 'asc')
            const user = auth.user! 
            const enrolledTeams = await user.related('userTeams').query()
            const enrolledTeamIds = enrolledTeams.map((userTeam) => userTeam.teamId)

            return view.render('pages/teams/index', { teams: teams, enrolledTeamIds: enrolledTeamIds} )
        } catch (error) {
            console.log(error)
        }
    }
}