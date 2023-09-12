import axios from 'axios';
import { errorInterceptor, responseInterceptor } from './interceptors';


const Api = axios.create({
    baseURL: "https://viacep.com.br/ws/",
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
    },
  });
  
  Api.interceptors.response.use(
    (response) => responseInterceptor(response),
    (error) => errorInterceptor(error),
  );
  
  export { Api };