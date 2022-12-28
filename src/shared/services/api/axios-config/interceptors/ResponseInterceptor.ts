import { AxiosResponse } from 'axios';

export const responseInterceptor = (response: AxiosResponse) => {
  console.log('API CONNECTED!!!');

  return response;
};
