---
id: http-host
title: HTTPHost
sidebar_label: HTTPHost
---

[0]: router.md#router-options
[1]: router.md

`simpleS` allows having multiple HTTP hosts on the same server.

```js
const simples = require('simples');

const server = simples();

const host = server.host('example.com');
```

## HTTPHost Instance

```js
server.host(name[, options])
```

| Argument   | Type                    | Default       |
|:----------:|-------------------------|---------------|
| `name`     | `string`                | N/A, required |
| `options`  | `simples.RouterOptions` | `null`        |
| **return** | `simples.HTTPHost`      |               |

`name` argument specifies the host name for which the requests will be handled,
the host name can contain `*` to match 1 or more characters in that part of the
host name. If invalid name argument is provided then this method will return
`null`.

`options` argument specifies the main router options, see [Router Options][0]
for detailed information. If it is not defined default router options are used.

---

The HTTPHost class extends the Router class, so the HTTP host is in the same
time the main router and has all the methods and properties of the Router class,
see [Router docs][1] for detailed information.

## Usage

Any server is in the same time the main host. This behavior is perfect for one
single HTTP host on a server.

```js
const server = simples(); // server and the main host in the same time
```

If more than one HTTP host on the server is needed `.host()` method of the
server should be used, it will create a new virtual HTTP host that will handle
requests that have the `HOST` header with the defined host name, the header
value and the defined host name should match.

```js
const exampleHost = server.host('example.com'); // host for example.com
```

For a more dynamic handling of HTTP hosts with subdomains wild cards can be
used, `*` should be added to the host name to match any sequence of 1 or more
characters.

```js
const otherHost = server.host('*.example.com'); // host with a wild card
```

## Error Handling

Any HTTP host instance is an event emitter, all possible errors that may appear
at the level of the HTTP host can be caught using the usual error event listener
attached to the instance. It is recommended to attach error event listeners to
the HTTP host to prevent any undesired behavior.

```js
host.on('error', (error) => {
    // Handle any error that occurs at the HTTP host level
});
```