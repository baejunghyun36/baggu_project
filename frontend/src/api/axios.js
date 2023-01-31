import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://baggu.shop:3000',
});

export default instance;
