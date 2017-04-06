# rd-fetch

> A developer friendly fetch wrapper class.

## What this do?

When trying to migrate across from ajax, I found the way fetch handled http response codes to be a bit confusing, especially for errors. I found it doubly confusing trying to handle json response payloads for errors. So I made this wrapper. When

## Installation

```bash
npm i -S rd-fetch
```

## Usage

`rd-fetch` exports a class `Fetch` which contains static methods for making different kinds of requests. So all you need to do is

```javascript
import Fetch from 'rd-fetch';
```

Then call the static method you need passing the required arguments to send your request.


**Note!** `rd-fetch` currently only supports `json`.

### JSON

`Fetch.json` is a static method that will handle requesting json from a resource. If the request status is ok, (ie., `response.ok`) you will be able to do what you want with the `response` in your `then`. If the request status is not ok, a rejected promise will be returned allowing you to catch the `response` payload in your `catch`. In both instances, the `response` will have a `json` property attached to it.

```javascript
import Fetch from 'rd-fetch';

Fetch.json('https://example.com/api')
	.then((response) => {
		console.log(response.json);
	})
	.catch((response) => {
		console.log(response.json);
	});
```

### Advanced Usage

Since fetch calls return promises, you can handle default and custom behaviour pretty nicely like so

```javascript
let user;

function request(url) {
	return Fetch.json(url)
		.then((response) => {
			console.log('request succeeded');
			Promise.resolve(response);
		})
		.catch((response) => {
			console.log('request failed');
			Promise.reject(response);
		});
}

function auth() {
	request('https://example.com/api/login')
		.then((response) => {
			user = response.json;
		})
		.catch((response) => {
			if (response.status === 401) {
				
			}
		})
}

login('https://example.com/api')
	.then((response) => {
		user = response.json;
	})
	.catch((response) => {
		customFailHandler(response);
	});
```
