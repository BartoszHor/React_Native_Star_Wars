import axios from 'axios';
import { isDev } from '../../packages/is-dev';

const instance = axios.create({
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

class RestClient {
  fetchCharacters = (url: string) => instance.get(url);

  fetchPlanetInfo = (url: string) => instance.get(url);
}

export default new RestClient();
