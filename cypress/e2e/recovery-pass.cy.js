import fpPage from '../support/pages/forgot-pass'
import rpPage from '../support/pages/reset-pass'
import loginPage from '../support/pages/login'
import shaversPage from "../support/pages/shavers"

describe('esqueci minha senha ', () => {

    it('deve poder solicitar o resgate de senha', () => {

        const user = {
            name: 'Darrin Coker',
            email: 'darrin.corkery@ethereal.email',
            password: '123456',
            is_shaver: false
        }

        cy.createUser(user)

        fpPage.go()
        fpPage.submit(user.email)

        const message = 'Enviamos um e-mail para confirmar a recuperação de senha, verifique sua caixa de entrada.'

        fpPage.noticeShouldBe(message)
    })

    context('quando o usuario solicita resgate de senha', () => {

        const user = {
            name: 'Darrin Coker',
            email: 'darrin.corkery@ethereal.email',
            password: '123456',
            is_shaver: false
        }

        beforeEach(() => {
            cy.createUser(user)
            cy.recoveryPass(user.email)
            cy.getToken(user.email)

        })
        it('deve poder cadastrar uma nova senha', () => {

            rpPage.go(Cypress.env('token'))
            rpPage.submit('abc123', 'abc123')

            const message = 'Agora você já pode logar com a sua nova senha secreta.'

            rpPage.noticeShouldBe(message)

        })

        afterEach(() => {
            loginPage.submit(user.email, 'abc123')
            shaversPage.header.userShouldBeLoggedIn(user.name)
        })

    })


})