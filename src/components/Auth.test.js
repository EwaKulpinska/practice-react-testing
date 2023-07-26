import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Auth from './Auth'

jest.spyOn(window, 'fetch')

describe('Testing component', () => {
    it('Should log in user with valid data provided', async() => {
        render(<Auth/>)

        const userLogin = 'jan@domena.pl'
        const userPassword = 'janeczek'
        const hashedPassword = '8ae75b43f70f20ba564200ef4ab63a33'

        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {
                return{Digest: hashedPassword}
            }
        })

        const loginInput = screen.getAllByLabelText('login')
        const passwordInput = screen.getAllByLabelText('password')
        const submitButton = screen.getByRole('button', {name: 'send'})

        userEvent.type(loginInput, userLogin)
        userEvent.type(passwordInput, userPassword)

        expect(loginInput.value).toBe(userLogin)
        expect(passwordInput).toBe(userPassword)

        userEvent.click(submitButton)

        const loggedUserHeader = await screen.findByText('Jesteś zalogowany jako: ' + userLogin)
        expect(loggedUserHeader).toBeInTheDocument()
        expect(loginInput).not.toBeInTheDocument()
        expect(passwordInput).not.toBeInTheDocument()
        expect(submitButton).not.toBeInTheDocument()
    })

    it('Should not log in user with invalid data provided', async() => {
        render(<Auth/>)

        const userLogin = 'jan@domena.pl'
        const userPassword = 'janeczek123'
        const hashedPassword = '8255b337231707e732e8ee6305c2f555'

        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {
                return {Digest: hashedPassword}
            }
        })

        const loginInput = screen.getByLabelText('login:')     
        const passwordInput = screen.getByLabelText('password:')
        const submitButton = screen.getByRole('button', {name: 'send'})

        userEvent.type(loginInput, userLogin)
        userEvent.type(passwordInput, userPassword)

        expect(loginInput.value).toBe(userLogin)
        expect(passwordInput.value).toBe(userPassword)

        userEvent.click(submitButton)

        expect(loginInput).toBeInTheDocument()
        expect(passwordInput).toBeInTheDocument()
        expect(submitButton).toBeInTheDocument()

        await waitFor(() => expect(screen.queryByText('Jesteś zalogowany jako: ' + userLogin)).not.toBeInTheDocument())
    })
})