import axios from 'axios';

export default class Categories {
  constructor() {
    this.categories = [];
  }

  async fetchCategories() {
    try {
      const response = await axios.get('http://localhost:3001/categories');
      this.categories = response.data;
    } catch(err) {
      console.log('Error-->', err);
      throw err;
    }
  }
}