import axios from 'axios';

export default class Games {
  constructor() {
    this.games = [];
  }

  async fetchGames() {
    try {
      const response = await axios.get('http://localhost:3001/games');
      this.games = response.data;
    } catch(err) {
      console.log('Error-->', err);
      throw err;
    }
  }
}