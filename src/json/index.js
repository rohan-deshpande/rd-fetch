import { isJson } from '../utils';

export const DEFAULTS = {
  method: 'GET',
  headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
  body: null,
};

export function json(url, options) {
  return fetch(url, {
    method: options.method.toUpperCase() || DEFAULTS.method,
    headers: options.headers || DEFAULTS.headers,
    body: options.body ? JSON.stringify(options.body) : DEFAULTS.body
  })
    .then((response) => {
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
