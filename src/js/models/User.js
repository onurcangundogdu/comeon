import axios from 'axios';

export default class User {
  constructor(username) {
    this.username = username;
  }

  async logout() {
    try {
      await axios.post('http://localhost:3001/logout', {
        username: this.username
      });
    } catch(err) {
      console.log('Logout Error -->', err);
      throw err;
    }
  }

  async login(password) {
    try {
      const response = await axios.post('http://localhost:3001/login', {
        username: this.username,
        password
      });

      const {name, avatar, event} = response.data.player;
      this.name = name;
      this.avatar = avatar;
      this.event = event;
    } catch(err) {
      console.log('Login Error -->', err);
      throw err;
    }
  }
}