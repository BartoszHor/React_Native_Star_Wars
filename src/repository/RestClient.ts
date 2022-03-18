import axios from 'axios';
import { getEnv } from '../../packages/config';
import { isDev } from '../../packages/is-dev';

const instance = axios.create({
  baseURL: getEnv('API_URL'),
  timeout: 30000,
});

if (isDev) {
  instance.interceptors.request.use((request) => {
    console.log('[RestClient] Starting Request', request);
    return request;
  });
  instance.interceptors.response.use(
    (response) => {
      console.log('[RestClient] Response:', response);
      return response;
    },
    (error) => {
      console.log('[RestClient] Error:', { ...error });
      return Promise.reject(error);
    },
  );
}

export class RestClient {
  fetchCharacters = (url: string) => instance.get(url);
}
