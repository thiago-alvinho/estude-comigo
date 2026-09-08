import type { HttpContext } from '@adonisjs/core/http'
import enrollmentValidator from '#validators/enrollment'
import AccessKey from '#models/access_key'
import UserTeam from '#models/user_team'
import db from '@adonisjs/lucid/services/db'

/**
 Enrollment controller é responsável por lidar com as requisições de enrollment
 O método create retorna o formulário para inscrição do usuário
 O método store cria uma inscrição do usuário na turma, mas antes verifica os seguintes pontos:
 1. Se a key fornecida existe;
 2. Se a key continua ativa;
 3. Se já existe uma inscrição do usuário na turma
 */
export default class EnrollmentsController {
    async create({ view }: HttpContext) {
        return view.render('pages/enrollments/create')
    }

    async store({ auth, response, request, session }: HttpContext) {
        const user = auth.user!
        const { key } = await request.validateUsing(enrollmentValidator)
        
        try {
            const accessKey = await AccessKey.findBy('key', key)
            
            if(!accessKey) {
                session.flash('error', 'Chave de acesso não encontrada.')
                return response.redirect().back()
            }
            if(!accessKey.isActive) {
                session.flash('error', 'Chave de acesso não está mais ativa.')
                return response.redirect().back()
            }
            
            const teamId = accessKey!.teamId!
            const alreadyEnrolled = await user
                .related('userTeams')
                .query()
                .where('teamId', teamId)
                .first()

                if(alreadyEnrolled) {
                    session.flash('error', 'Usuário já está matriculado na turma')
                    return response.redirect().back()
                }

            await db.transaction(async (trx) => {
                const userTeam = new UserTeam()
                userTeam.teamId = teamId
                userTeam.userId = user.id
                userTeam.accessKeyId = accessKey.id
                userTeam.useTransaction(trx)
                await userTeam.save()

                userTeam
            })


            session.flash('success', 'Usuário inscrito com sucesso!')
            return response.redirect().toRoute('myTeams')
        } catch (error) {
            session.flash('error', 'Ocorreu um erro inesperado ao processar sua inscrição. Tente novamente.')
            return response.redirect().back()
        }

    }
}