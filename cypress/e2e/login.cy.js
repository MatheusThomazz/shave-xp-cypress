import loginPage from "../support/pages/login"
import shaversPage from "../support/pages/shavers"

import data from '../fixtures/users-login.json'


describe('login', () => {

    context('quando submeto o formulario', () => {


        it.only('deve logar com sucesso', () => {
            const user = data.sucess

            loginPage.submit(user.email, user.password)
            shaversPage.header.userShouldBeLoggedIn(user.name)

        })

        it('não deve logar com senha incorreta', () => {

            const user = data.invpass

            loginPage.submit(user.email, user.password)

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            loginPage.noticeShouldBe(message)

        })

        it('não deve logar com email não cadastrado', () => {

            const user = data.email404

            loginPage.submit(user.email, user.password)

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            loginPage.noticeShouldBe(message)


        })

        it('campos obrigatorios', () => {
            loginPage.submit()
            loginPage.requiredFields('E-mail é obrigatório', 'Senha é obrigatória')

        })
    })

    context('senha muito curta', () => {
        data.shortpass.forEach((p) => {
            it(`não deve logar com senha ${p}`, () => {
                loginPage.submit('matheus@hotmail.com', p)
                loginPage.alertShouldBe('Pelo menos 6 caracteres')

            })
        })
    })

    context('email no formato incorreto', () => {

        data.invemails.forEach((e) => {
            it(`não deve logar com senha ${e}`, () => {
                loginPage.submit(e, '220684')
                loginPage.alertShouldBe('Informe um email válido')
            })
        })
    })


})

