import axios from 'axios';

const Api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    "content-type": "application/json"
  }
});

export { Api }
