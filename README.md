# rd-fetch

> A developer friendly fetch wrapper class.

## About

When trying to migrate across from ajax, I found the way fetch handled http response codes to be a bit confusing, especially for errors. This was made even more troublesome when trying to read a json stream when `!response.ok`, so I made this wrapper class.

## Installation

```bash
npm i -S rd-fetch
```

## Usage

**Note!** `Fetch` currently only supports `json`.

### JSON

`Fetch` exposes a static method `json` which will handle requesting json from a resource. If the request status is ok, (ie., `response.ok`) you will be able to do what you want with the `response` in your `then`. If the request status is not ok, a rejected promise will be returned allowing you to catch the `response` payload in your `catch`. In both instances, the `response` will have a `json` property attached to it.

```javascript
import Fetch from 'rd-fetch'

Fetch.json('https://api.myapp.com')
	.then((response) => {
		console.log(response.json);
	})
	.catch((response) => {
		console.log(response.json);
	});
```
