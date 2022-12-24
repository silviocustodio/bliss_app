import axios from 'axios';
import { responseInterceptor, errorInterceptor } from './interceptors';

import { Environment } from '../../../environment/index';

const Api = axios.create({
  baseURL: Environment.BASE_URL,
});

Api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptor(error)
);

export { Api };
