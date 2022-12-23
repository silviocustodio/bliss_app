import { AxiosResponse } from 'axios';
import React from 'react';

export const responseInterceptor = (response: AxiosResponse) => {
  console.log('API CONNECTED!!!');

  return response;
};
