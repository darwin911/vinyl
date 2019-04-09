import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000'
})

const allUsers = async () => {
  const resp = await api.get(`/users`);
  return resp.data
}

const createUser = async (registerData) => {
  const resp = await api.post('/users', { "user": registerData });
  return resp.data
}

const loginUser = async (loginData) => {
  const resp = await api.post('/user_token', { "auth": loginData });
  return resp.data
}

const uploadTrack = async (track) => {
  const resp = await api.post('/rails/active_storage/direct_uploads', track)
  return resp.data
}

const createPlaylist = async (playlistData) => {
  const resp = await api.post('/users/1/playlists/', playlistData)
  console.log(resp)
}

export {
  allUsers,
  createUser,
  loginUser,
  uploadTrack,
  createPlaylist,
};