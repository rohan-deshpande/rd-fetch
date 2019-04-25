import { DEFAULTS as JSON_DEFAULTS, json as fetchJson } from './json';

export default class Fetch {
  static json(url, options = JSON_DEFAULTS) {
    if (!url) {
      throw new Error('You must provide a url resource to fetch');
    }
    return fetchJson(url, options);
  }
}
