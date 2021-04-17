import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'

import Meta from '../components/Meta'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'

import { login } from '../actions/userActions'

const LoginScreen = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  const redirect = props.location.search ? props.location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect)
    }
  }, [props.history, userInfo, redirect])

  return (
    <FormContainer>
      <Meta title={`| Login`} />
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter Email'
            autoComplete='username'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter Password'
            autoComplete='current-password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button variant='dark' type='submit'>
          Sign In
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen
