/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-node-access */
import {render, screen, waitFor} from '@testing-library/react'
import  userEvent  from '@testing-library/user-event'
import Md5Form from '../components/Md5Form'
import {getMd5} from '../providers/md5Provider'

jest.spyOn(window, 'fetch');

const passwordFetchResolvedOnce = (mock,hashedPassword) => {
    mock.mockResolvedValueOnce({
        ok: true,
        json: async () => {
            return {Digest: hashedPassword}
        }
    })
}

describe('Tesing component', () => {
    it('Should show input value in .data-text element', async () => {
        const { container } = render(<Md5Form getMd5={getMd5}/>)

        const input = screen.getByLabelText('')
        userEvent.type(input,'1234')

       const formField = container.querySelector('.data-text')

        expect(formField.textContent).toBe('1234')
    })
    it('Should load data to .data-md5 element when submitted', async () => {

        const { container } = render(<Md5Form getMd5={getMd5}/>)
        const hashedPassword = '81dc9bdb52d04dc20036dbd8313ed055'

        passwordFetchResolvedOnce(window.fetch,hashedPassword)

        const input = screen.getByLabelText('')
        const submitButton = screen.getByRole('button', {name: 'send'})
        const formField =  container.querySelector('.data-md5')


        userEvent.type(input,'1234')
        userEvent.click(submitButton)

        await waitFor(() => expect(formField).toHaveTextContent(hashedPassword))
    })

    it('Should render input value in .data-text element', async () => {

        const { container } = render(<Md5Form getMd5={getMd5}/>)
        const hashedPassword = '81dc9bdb52d04dc20036dbd8313ed055'

        passwordFetchResolvedOnce(window.fetch,hashedPassword)

        const input = screen.getByLabelText('')
        const submitButton = screen.getByRole('button', {name: 'send'})
        const formField =  container.querySelector('.data-md5')


        userEvent.type(input,'1234')
        userEvent.click(submitButton)
        userEvent.type(input,'0123')

        await waitFor(() => expect(formField).toHaveTextContent(''))

    })
})