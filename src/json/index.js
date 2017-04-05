import { isJson } from '../utils';

export const DEFAULTS = {
  method: 'GET',
  headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
  body: null,
};

export default function json(url, options) {
  return fetch(url, options)
    .then((response) => {
      const contentType = response.headers.get('Content-Type');

      if (contentType && contentType.indexOf('application/json') < 0) {
        throw new TypeError('Content-Type of response is not application/json');
      }

      if (response.ok) {
        return response.text().then((text) => {
          response.json = isJson(text) ? JSON.parse(text) : null;

          return Promise.resolve(response);
        });
      }

      return response.text().then((text) => {
        response.json = isJson(text) ? JSON.parse(text) : null;

        return Promise.reject(response);
      });
    })
    .catch((error) => {
      if (typeof error !== 'object') {
        console.error(error);
      }

      return Promise.reject(error);
    });
}
