import axios from 'axios';
import { responseInterceptor, errorInterceptor } from './interceptors';

const Api = axios.create({
  baseURL: 'https://private-bbbe9-blissrecruitmentapi.apiary-mock.com',
});

Api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptor(error)
);

export { Api };
