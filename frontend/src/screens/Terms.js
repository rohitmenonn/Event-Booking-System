import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'

const ShippingScreen = ({ history }) => {

  const address = 'sample'
  const city = 'sample'
  const postalCode = 'sample'
  const country = 'sample'

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    history.push('/payment')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Terms and Conditions</h1>
      <p className='terms'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer luctus eu est ac malesuada. Suspendisse sed lobortis libero, vitae scelerisque nulla. Morbi sagittis tortor massa, faucibus lobortis arcu ultricies at. Aenean tincidunt sagittis mi vel lobortis. Donec rhoncus, quam sed tincidunt tincidunt, nibh quam aliquet turpis, sit amet dictum velit arcuer. </p>
      <p className='terms'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer luctus eu est ac malesuada. Suspendisse sed lobortis libero, vitae scelerisque nulla. Morbi sagittis tortor massa, faucibus lobortis arcu ultricies at. Aenean tincidunt sagittis mi vel lobortis. Donec rhoncus, quam sed tincidunt tincidunt, nibh quam aliquet turpis, sit amet dictum velit arcuer. </p>
      <Form onSubmit={submitHandler}>
        <Button type='submit' variant='primary'>
          I agree
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
