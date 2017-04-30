# Change log

## [1.0.6] - 2017-04-30
### Added
Added change log

### Changed
* Removed content type check from `Fetch.json` method as this is a bad pattern. You can't always be sure if the content type in the response headers will be `application/json` and if it isn't it doesn't mean the request should fail. Since the method uses `response.text()` and checks for JSON after that, I think it is safe to remove
* Updated related test to reflect this change
* Patched package version
