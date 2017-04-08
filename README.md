# rd-fetch

> A developer friendly fetch wrapper class.

## What this do?

When trying to migrate across from ajax, I found the way fetch handled http response codes to be a bit confusing, especially for errors. I found it doubly confusing trying to handle json response payloads for errors. So I made this wrapper.

## Installation

```bash
npm i -S rd-fetch
```

## Tests

```bash
npm run test
```

## Usage

`rd-fetch` exports a class `Fetch` which contains static methods for making different kinds of requests. So all you need to do is

```javascript
import Fetch from 'rd-fetch';
```

Then call the static method you need passing the required arguments to send your request.


**Note!** `rd-fetch` currently only supports `json`.

### JSON

`Fetch.json` is a static method that will handle communicating with a resource via json. If the request status is ok, (ie., `response.ok`) you will be able to do what you want with the `response` in your `then`. If the request status is not ok, a rejected promise will be returned allowing you to catch the `response` payload in your `catch`. In both instances, the `response` will have a `json` property attached to it.

```javascript
import Fetch from 'rd-fetch';

Fetch.json('https://example.com/api')
  .then((response) => {
	console.log(response.json);
  })
  .catch((error) => {
	console.log(error.json);
  });
```

### Advanced Usage

Since fetch calls return promises, you can handle default and custom behaviour pretty nicely by wrapping a call to a `Fetch` static method in a function that returns it like so

```javascript
const log = {
    responses: [],
    errors: []
};
let user;

function request(url, options) {
  return Fetch.json(url, options)
    .then((response) => {
      log.responses.push(response);
      Promise.resolve(response);
    })
    .catch((error) => {
      log.errors.push(error);
      Promise.reject(error);
	});
}

request('https://example.com/api/login', {
    method: 'POST',
    body: creds
})
  .then((response) => {
    user = response.json;
  })
  .catch((error) => {
    console.log(error);
  });
```

## License

[MIT](https://opensource.org/licenses/MIT)

## Credits

`rd-fetch` was built by [@rohandeshpande](http://rohandeshpande.com) with

* [Atom](https://atom.io)
* [iTerm2](https://www.iterm2.com/)
* [JSON Server](https://github.com/typicode/json-server)
* [Mocha](https://mochajs.org/)
* [Chai](http://chaijs.com/)
