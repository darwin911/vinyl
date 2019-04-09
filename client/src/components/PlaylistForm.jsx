import React, { Component } from 'react'
import { Form, FormText, Button } from 'react-bootstrap'

class PlayListForm extends Component {

  render() {
    const { playlistName, playlistLength, handleChange, handleSubmitPlaylist, fileSelectedHandler } = this.props
    return (
      <Form onSubmit={handleSubmitPlaylist} encType="multipart/form-data">

        <FormText>Add Playlist</FormText>
        <Form.Control
          type="text"
          name="playlistName"
          value={playlistName}
          onChange={handleChange}
          placeholder="Playlist Name"
          required />

        <Form.Control
          type="number"
          name="playlistLength"
          value={playlistLength}
          min={1}
          max={10}
          onChange={handleChange}
          required />

         <Form.Control
          type="file"
          name="avatar"
          onChange={fileSelectedHandler}
           multiple required />
           
        <Button variant="secondary" type="submit">Upload</Button>
      </Form>
    )
  }
}

export default PlayListForm;