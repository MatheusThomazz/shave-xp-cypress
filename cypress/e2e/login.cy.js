import loginPage from "../support/pages/login"
import shaversPage from "../support/pages/shavers"


describe('login', () => {

    context('quando submeto o formulario', () => {


        it('deve logar com sucesso', () => {
            const user = {
                name: 'Matheus',
                email: 'matheus@hotmail.com',
                password: '220684'
            }

            loginPage.submit(user.email, user.password)
            shaversPage.header.userShouldBeLoggedIn(user.name)

        })

        it('não deve logar com senha incorreta', () => {

            const user = {
                name: 'Matheus',
                email: 'matheus@hotmail.com',
                password: '123456'
            }

            loginPage.submit(user.email, user.password)

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            loginPage.noticeShouldBe(message)

        })

        it('não deve logar com email não cadastrado', () => {

            const user = {
                name: 'Matheus',
                email: 'matheus@404hotmail.com',
                password: '123456'
            }

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

        const passwords = [
            '1',
            '12',
            '123',
            '1234',
            '12345'
        ]

        passwords.forEach((p) => {
            it(`não deve logar com senha ${p}`, () => {
                loginPage.submit('matheus@hotmail.com', p)
                loginPage.alertShouldBe('Pelo menos 6 caracteres')

            })
        })
    })

    context('email no formato incorreto', () => {

        const emails = [
            'matehsu$$gmail',
            'matheus.com.br',
            '@',
            '123434344',
            '$#%@&',
            'hgjdksh'
        ]

        emails.forEach((e) => {
            it(`não deve logar com senha ${e}`, () => {
                loginPage.submit(e, '220684')
                loginPage.alertShouldBe('Informe um email válido')
            })
        })
    })


})

