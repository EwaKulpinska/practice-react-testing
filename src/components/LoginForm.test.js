import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CatchError from '../CatchError'
import LoginForm from './LoginForm'

describe('Testing component', () => {
    it('Should render login field', () => {
        render(<LoginForm/>)

        const passwordInput = screen.getByLabelText('password:')
       expect(passwordInput).toBeInTheDocument()
    })

    it('Should render password field', () => {
        render(<LoginForm/>)

       const passwordInput = screen.getByLabelText('password:')
       expect(passwordInput).toBeInTheDocument()
    })

    it('Should render password submit button', () => {
        render(<LoginForm/>)

       const submitButton = screen.getByRole('button', {name: 'send'})
       expect(submitButton).toBeInTheDocument()
    })

    const loginInput = screen.getByLabelText('login:')
       userEvent.type(loginInput,'12')

       const loginError = screen.getByText('The field is too short!')
       expect(loginError).toBeInTheDocument()

       it('Should show error if password is too short', () => {
        render(<LoginForm/>)

       const passwordInput = screen.getByLabelText('password:')
       userEvent.type(passwordInput,'34')

       const passwordError = screen.getByText('The field is too short!')
       expect(passwordError).toBeInTheDocument()
    })

    it('Should show error if form submitted with invalid data', () => {
        const mockFn = jest.fn()
        render(<CatchError><LoginForm tryAuth={mockFn}/></CatchError>)
        mockFn.mockReturnValue(false)

       const loginInput = screen.getByLabelText('login:')
       userEvent.type(loginInput,'12')

       const passwordInput = screen.getByLabelText('password:')
       userEvent.type(passwordInput,'34')

       const submitButton = screen.getByRole('button', {name: 'send'})
       userEvent.click(submitButton)
       expect(mockFn).toBeCalledTimes(1)

       const errorHeader = screen.getByRole('heading', {name: 'Incorrect data'})
       expect(errorHeader).toBeInTheDocument()
    })

    it('Should pass if form submitted with correct data', () => {
        const mockFn = jest.fn()
        render(<LoginForm tryAuth={mockFn}/>)
        mockFn.mockReturnValue(true)

       const loginInput = screen.getByLabelText('login:')
       userEvent.type(loginInput,'1234')

       const passwordInput = screen.getByLabelText('password:')
       userEvent.type(passwordInput,'5678')

       const submitButton = screen.getByRole('button', {name: 'send'})
       userEvent.click(submitButton)
       expect(mockFn).toBeCalledTimes(1)
       expect(mockFn).not.toThrow('Incorrect Data')
    })
})