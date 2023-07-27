import { render, screen } from "@testing-library/react";
import  userEvent  from '@testing-library/user-event'
import Card from "./Card";

const testCard = async (cardName, cardNumber) =>{
    render(<Card/>)
    const cardInput = screen.getByLabelText('Card number:')
    const submitButton = screen.getByRole('button', {name: 'check'})

    userEvent.type(cardInput,cardNumber)
    userEvent.click(submitButton)

    const cardParagraph = await screen.findByText(cardName)
    expect(cardParagraph.textContent).toBe(cardName)
}

describe('Testing Card', () => {
    it('Should render card number input', () => {
        render(<Card/>)

        const cardInput = screen.getByLabelText('Card number:')
        expect(cardInput).toBeInTheDocument()
    })
    it('Should render submit button', () => {
        render(<Card/>)

        const submitButton = screen.getByRole('button', {name: 'check'})
        expect(submitButton).toBeInTheDocument()
    })

    it('Should return VISA when number length is 16 and first digit is 4', async () => {
        testCard('Visa','4111111111111')

    })

    it('Should return MasterCard when number length is 16, first digit is 5 and second is between 1 and 5', async () => {
        testCard('MasterCard','5211111111111111')
    })

    it('Should return American Express when number length is 15, first digit is 3 and second is 4 or 7', async () => {
        testCard('American Express','341111111111111')
    })

    it('Should return Diners Club Carte Blanche when number length is 14, first digit is 3 and second is between 0, 6 or 8', async () => {
        testCard('Diners Club Carte Blanche','36111111111111')
    })

    it('Should return JCB when number length is 16 and starts with 3088,3096,3112,3158,3337 or 3528', async () => { 
        testCard('JCB','3088111111111111')
    })

    it('Should return Information when card is valid but bank not supported', async () => { 
        testCard('Not supported bank card!','9643658048940372')
    })

    it('Should return Invalid data when', async () => { 
        testCard('Invalid card number!','4000000000000000')
    })
})