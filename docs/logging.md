---
id: logging
title: Logging
sidebar_label: Logging
---

`simpleS` allows logging information in a fully configurable way.

Both HTTP and WS connections have the `.log()` method for logging data, moreover
routers have a special configuration for logging in a more global way. There are
3 entities used in logging: `tokens`, `format` and `logger function`. The tokens
are special string shortcuts to some available information about the current
connection, there are default tokens, connection or time related, but any
custom tokens can be defined. The format represents a string containing some
tokens to define the structure of the logs, if no format is provided then a
default format is being used. The logger function is a function that will
consume the output log, if none is provided then `console.log` is called with
the created output.

## Default Format

If no format is provided then the default format is used for both, HTTP and WS
protocols.

HTTP: `%short-date %time %method %href`

WS: `%short-date %time %protocol %href`

## Default Tokens

By default `simpleS` provides a set of tokens to be used when logging data.

### Connection Related Tokens

#### Common Connection Tokens

- `%protocol` - insert the protocol used by the connection (`http(s)` or
`ws(s)`)
- `%host` - insert the url host of the request
- `%hostname` - insert the url hostname of the request
- `%href` - insert the full url of the request
- `%path` - insert the pathname of the request
- `%ip` - insert the remote ip address

#### HTTP Connection Tokens

- `%req[HEADER]` - insert the value of a request header
- `%res[HEADER]` - insert the value of a response header
- `%method` - insert the method of the request
- `%status` - insert the status code of the response
- `%lang` - insert the defined `Content-Language` header for the response
- `%type` - insert the defined `Content-Type` header for the response

### Time Related Tokens
- `%date` - insert the string representing current date
- `%short-date` - insert the current date in the format `dd.mm.yyyy`
- `%time` - insert the current time in the format `hh:mm:ss`
- `%short-time` - insert the current time in the format `hh:mm`
- `%timestamp` - insert the UNIX time value
- `%year` - insert the current year as a 4 digit number
- `%month` - insert the current month of the year as a 2 digit number
- `%day` - insert the current day of the month as a 2 digit number
- `%hour` - insert the current hour of the day as a 2 digit number
- `%minute` - insert the current minute of the hour as a 2 digit number
- `%second` - insert the current second of the minute as 2 digit number

## Token Definition

To define tokens in addition to default tokens an object with functions should
be provided to connection `.log()` method or in router logger configuration
options, these functions will receive the current connection, get any
information from it and should return a string as a replacement.

```js
{
    'custom-token': (connection) => {

        return 'custom-token-replacement';
    }
}
```