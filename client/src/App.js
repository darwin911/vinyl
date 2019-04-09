import React, { Component } from 'react';
import './App.css';
import lane8 from './assets/lane_8-no_end_in_sight_outro.mp3'
import Sound from 'react-sound';
import {
  Button,
  ButtonGroup,
  // Form,
  Nav,
  Navbar,
  // FormText,
} from 'react-bootstrap'
import {
  createUser,
  loginUser,
  uploadTrack,
  createPlaylist,
} from './services/helper';
import Auth from './components/Auth';
import PlayListForm from './components/PlaylistForm';

class App extends Component {
  constructor() {
    super()
    this.state = {
      playStatus: "STOPPED",
      name: '',
      email: 'test@test.com',
      password: 'test',
      picture: '',
      isLoggedIn: false,
      playlistName: '',
      playlistLength: '',
      files: null,
    }
    this.play = this.play.bind(this)

    this.handleChange = this.handleChange.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)

    this.handleSubmitPlaylist = this.handleSubmitPlaylist.bind(this)

    this.fileSelectedHandler = this.fileSelectedHandler.bind(this)
    this.fileUploadHandler = this.fileUploadHandler.bind(this)
  }

  async componentDidMount() {
    console.log('componentDidMount Called')
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
    const loginData = { email, password, }

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

  handleLogout(e) {
    e.preventDefault();
    this.setState({ isLoggedIn: false })
  }

  async handleRegister(e) {
    e.preventDefault();
    console.log('handleRegister Called')
    const { name, email, password, picture } = this.state;
    const registerData = { name, email, password, picture }
    const user = await createUser(registerData);

    this.setState({
      token: user
    })
  }

  play() {
    (this.state.playStatus === 'STOPPED' | this.state.playStatus === 'PAUSED')
      ? this.setState({ playStatus: 'PLAYING' })
      : this.setState({ playStatus: 'PAUSED' })
  }

  fileSelectedHandler(e) {
    console.log(e.target.files[0])
    this.setState({
      files: e.target.files[0]
    })
  }

  async fileUploadHandler() {
    const fd = new FormData()
    fd.append('avatar', this.state.files, this.state.files.name)
    const resp = await uploadTrack(this.state.files)
    console.log(resp);
  }

  async handleSubmitPlaylist(e) {
    e.preventDefault();
    console.log('hello')
    const { playlistName, playlistLength, files } = this.state

    const playlistData = {
      name: playlistName,
      length: 1,
      avatar: this.state.files,
      playback_url: "http://www.google.com",
      user_id: 1,
    }

    const form = new FormData(playlistData)

    const resp = await createPlaylist(form)
    console.log(resp)
  }

  render() {
    const { isLoggedIn, name, email, password, playlistName, playlistLength, files } = this.state
    return (
      <div className="App">
        <header>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">Vinyl</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              {(this.state.isLoggedIn === false)
                ? <>
                  <Nav.Link href="#login">Login</Nav.Link>
                  <Nav.Link href="#register">Register</Nav.Link>
                </>
                : <Nav.Link href="home" onClick={this.handleLogout}>Logout</Nav.Link>}
            </Nav>
          </Navbar>
        </header>
        <main>

          <PlayListForm
            fileSelectedHandler={this.fileSelectedHandler}
            handleChange={this.handleChange}
            handleSubmitPlaylist={this.handleSubmitPlaylist}
            files={files}
            playlistName={playlistName}
            playlistLength={playlistLength}
          />

          <Auth
            isLoggedIn={isLoggedIn}
            handleRegister={this.handleRegister}
            handleLogin={this.handleLogin}
            handleChange={this.handleChange}
            name={name}
            email={email}
            password={password}
          />

          <Sound url={lane8}
            playStatus={this.state.playStatus}>audio</Sound>
          <ButtonGroup>
            <Button variant="outline-primary" onClick={this.play}>Play/Pause</Button>
          </ButtonGroup>
        </main>
      </div>
    );
  }
}

export default App;