import React, { useState } from "react"

const Card = () => {
    const [cardNumber, setCardNumber] = useState('')
    const [cardProvider, setCardProvider] = useState('')

    const handleChange = (e) => {
        setCardNumber(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(isCardNumberValid(cardNumber)){
            const provider = checkProvider(cardNumber)

                setCardProvider(provider)
                return
        }
        setCardProvider('Invalid card number!')
    }

    const isCardNumberValid = (cardNumber) => {
        let checksum = 0;
        let multiplier = 1;

    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let calc = 0;

      calc = Number(cardNumber.charAt(i)) * multiplier;

      if (calc > 9) {
        checksum = checksum + 1;
        calc = calc - 10;
      }

      checksum = checksum + calc;

      if (multiplier === 1) {
        multiplier = 2;
      } else {
        multiplier = 1;
      }
    }
    return (checksum % 10) === 0;
    }

    const checkProvider = (cardNumber) => {

        if(/^4[0-9]{12}(?:[0-9]{3})?$/.test(cardNumber)) return 'Visa'
        if(/^5[1-5][0-9]{14}$/.test(cardNumber)) return 'MasterCard'
        if(/^3[47][0-9]{13}$/.test(cardNumber)) return 'American Express'
        if(/^3[068][0-9]{12}$/.test(cardNumber)) return 'Diners Club Carte Blanche'
        if(/^(3088|3096|3112||3158||3337|3528)[0-9]{12}$/.test(cardNumber)) return 'JCB'
        return 'Not supported bank card!'
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
            Card number: <input name="cardNumber" value={cardNumber} onChange={(e) => handleChange(e)}/>
            </label>
        <button>check</button>
        <p>{cardProvider}</p>
    </form>
    )
}


export default Card