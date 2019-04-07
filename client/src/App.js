import React, { Component } from 'react';
import './App.css';
import lane8 from './assets/lane_8-no_end_in_sight_outro.mp3'
import Sound from 'react-sound';
import {
  Button,
  ButtonGroup,
  Form,
  Nav,
  Navbar,
} from 'react-bootstrap'
import { createUser, loginUser } from './services/helper';

class App extends Component {
  constructor() {
    super()
    this.state = {
      playStatus: "STOPPED",
      name: '',
      email: '',
      password: '',
      picture: '',
      isLoggedIn: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.play = this.play.bind(this)
  }

  async componentDidMount() {
    // const resp = await allUsers()
    // console.log(resp)
  }

  handleChange(e) {
    const { name, value } = e.target
    this.setState(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }


  async handleLogin(e) {
    e.preventDefault();
    console.log('handleLogin called')
    const { email, password } = this.state
    const loginData = {
      email,
      password,
    }
    try {
      const user = await loginUser(loginData)
      this.setState({
        token: user,
        email: '',
        password: '',
        isLoggedIn: true,
      })
    } catch (error) {
      console.error("INVALID_CREDENTIALS", error)
    }

  }
  

  async handleSubmit(e) {
    e.preventDefault();
    console.log('handleSubmit Called')
    const { name, email, password, picture } = this.state;
    console.log(name, email, password)

    const registerData = {
      name,
      email,
      password,
      picture,
    }

    const user = await createUser(registerData);
    console.log(user)

    this.setState({
      token: user
    })

  }

  play() {
    (this.state.playStatus === 'STOPPED' | this.state.playStatus === 'PAUSED')
      ? this.setState({ playStatus: 'PLAYING' })
      : this.setState({ playStatus: 'PAUSED' })
  }

  render() {
    return (
      <div className="App">
        <header>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">Vinyl</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
            </Nav>
            <ButtonGroup>
              <Button variant="outline-info">Sign In</Button>
              <Button variant="outline-info">Register</Button>
            </ButtonGroup>
          </Navbar>
        </header>
        <main>

          {/* <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="name">
              <Form.Control type="text" name="name" placeholder="Your name" onChange={this.handleChange} required />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Control type="email" name="email" placeholder="Enter email" onChange={this.handleChange} required />
              <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Control type="password" name="password" placeholder="Password" onChange={this.handleChange} required />
            </Form.Group>
            <Button variant="primary" type="submit">Register</Button>
          </Form> */}

          {!this.state.isLoggedIn && <Form onSubmit={this.handleLogin}>
            <Form.Group controlId="email">
              <Form.Control type="email" name="email" placeholder="Enter email" onChange={this.handleChange} value={this.state.email} required />
              <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Control type="password" name="password" placeholder="Password" onChange={this.handleChange} value={this.state.password} required />
            </Form.Group>
            <Button variant="primary" type="submit">Sign In</Button>
          </Form>}
          




          <Sound url={lane8}
            playStatus={this.state.playStatus}>audio</Sound>
          <ButtonGroup>
            <Button variant="outline-primary" onClick={this.play}>PLAY/PAUSE</Button>
          </ButtonGroup>
        </main>
      </div>
    );
  }
}

export default App;
