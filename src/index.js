import {
  fetchJson,
  DEFAULTS as JSON_DEFAULTS
} from './json';

export default class Fetch {
  static json(url, options = JSON_DEFAULTS) {
    return fetchJson(url, options);
  }
}
