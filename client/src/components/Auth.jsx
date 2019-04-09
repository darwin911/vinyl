import React from 'react'
import { Form, Button } from 'react-bootstrap';

const Auth = (props) => {
  const { isLoggedIn, handleRegister, handleLogin, handleChange, name, email, password } = props
  return (
    <section>
      {
        !isLoggedIn &&
        <>
          <Form onSubmit={handleRegister}>
            <Form.Group controlId="name">
              <Form.Control
                type="text"
                name="name"
                placeholder="Your name"
                onChange={handleChange}
                value={name}
                required />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                onChange={handleChange}
                value={email}
                required />
              <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={password}
                required />
            </Form.Group>
            <Button variant="primary" type="submit">Register</Button>
          </Form>

          <Form onSubmit={handleLogin}>
            <Form.Group controlId="email">
              <Form.Control type="email" name="email" placeholder="Enter email" onChange={handleChange} value={email} required />
              <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Control type="password" name="password" placeholder="Password" onChange={handleChange} value={password} required />
            </Form.Group>
            <Button variant="primary" type="submit">Sign In</Button>
          </Form>
        </>
      }
    </section>
  )
}

export default Auth;
