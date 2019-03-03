---
id: server
title: Server
sidebar_label: Server
---

[0]: #server-options
[1]: http-host.md
[2]: https://nodejs.org/api/http.html#http_server_listen
[3]: https://nodejs.org/api/tls.html#tls_tls_createserver_options_secureconnectionlistener
[4]: router.md#router-options
[5]: https://nodejs.org/api/https.html#https_https_createserver_options_requestlistener
[6]: mirror.md
[7]: https://www.npmjs.org/package/simples-redirect

`simpleS` provides the simplest way to create a HTTP(S) server instance.

```js
const simples = require('simples');

const server = simples();
```

## Server Instance

```js
simples([port, options, callback])

// or

simples.server([port, options, callback])
```

| Argument   | Type                               | Default                    |
|:----------:|------------------------------------|----------------------------|
| `port`     | `number`                           | `80` - HTTP, `443` - HTTPS |
| `options`  | `simples.ServerOptions`            | `null`                     |
| `callback` | `(server: simples.Server) => void` | `null`                     |
| **return** | `simples.Server`                   |                            |

`port` argument specifies on which port the server should be listening, this
value overwrites the port value from the `options` argument. By default this
value is set to 80 for HTTP servers and 443 for HTTPS servers.

`options` argument specifies general server configuration. If it is not defined
default server options are used. Their structure is explained [below][0].

`callback` argument specifies a function which is triggered when the server is
started for the first time, it will receive one argument, which is the server
itself.

---

The Server class extends the HTTPHost class, so the server is in the same time
the main host and has all the methods and properties of the HTTPHost class, see
[HTTPHost docs][1] for detailed information.

## Server Options

Server options, basically, implements the [`http.Server.listen()`][2] method
with the possibility to create a HTTPS server by defining the [TLS options][3].
Also it provides the possibility to define the main router configuration, see
[Router Options][4] for detailed information.

```js
{
    config: {},             // Main router configuration, see Router Options
    port: 80,               // Port, default is 80 for HTTP and 443 for HTTPS
    hostname: '0.0.0.0',    // Hostname from which to accept connections
    backlog: 511,           // The maximum length of pending connections
    https: {}               // Options for setting up a HTTPS server
}
```

## HTTP Server Instance

To create a HTTP server use one of the following approaches:

```js
const server = simples(80);
```
```js
// or simpler

const server = simples(); // The server will be set on port 80
```
```js
// or with the port and a callback

simples(80, (server) => {
    // Do something with the server instance
});
```
```js
// or with just the callback

simples((server) => { // The server is also set on port 80
    // Do something with the server instance
});
```

## HTTPS Server Instance

If the `https` property is present in the `options` argument the created server
is a HTTPS server. These HTTPS options should be the same as they would pe
provided for [`https.Server`][5] with the exception that for the `key` and
`cert` or `pfx` properties should be paths to the `.pem` or `.pfx` files,
`simpleS` will resolve their content when it is required. Note: by creating a
HTTPS server there will be no HTTP server provided, a mirror should be created
for this purpose (see Mirror docs for more info).

To create a HTTPS server use one of the following approaches:

```js
const server = simples(443, {
    https: {
        key: 'path/to/key.pem',
        cert: 'path/to/cert.pem'
    }
});
```
```js
// or just

const server = simples({ // The server will be set on port 443
    https: {
        key: 'path/to/key.pem',
        cert: 'path/to/cert.pem'
    }
});
```
```js
// or with a callback

simples({ // The server is also set on port 443
    https: {
        key: 'path/to/key.pem',
        cert: 'path/to/cert.pem'
    }
}, (server) => {
    // Do something with the server object
});
```

On HTTPS server creation an additional HTTP server may be needed, use a mirror
for this, see [Mirror docs][6].

```js
// Add a HTTP mirror
server.mirror(); // The mirror is set on port 80, see Mirror docs
```

To redirect the client to HTTPS try [simples-redirect][7] middleware.

## Starting and Restarting

```js
.start([port, callback])
```

| Argument   | Type                               | Default                    |
|:----------:|------------------------------------|----------------------------|
| `port`     | `number`                           | `80` - HTTP, `443` - HTTPS |
| `callback` | `(server: simples.Server) => void` | `null`                     |
| **return** | `simples.Server`                   |                            |

Start listening for requests on the provided port. If the server is already
started and the provided port differs from the server's port then simpleS will
restart the server and will listen on the new provided port. Can have an
optional callback. All connection in simpleS are kept alive and the restart can
take few seconds for closing alive http and ws connections. While restarting, no
new connection will be accepted but existing connections will be still served.
When the server will be started the `start` event will be emitted. This method
is called automatically when a new simpleS instance is created, it is not needed
to call it explicitly on server creation. The purpose of this method is to
provide a way to switch port. Returns current instance, so calls can be chained.

```js
server.start(80, (server) => {
    // Application logic
});

// Listen for the start of the server
server.on('start', (server) => {
    // Application logic
});
```

## Stopping

```js
.stop([callback])
```

| Argument   | Type                               | Default |
|:----------:|------------------------------------|---------|
| `callback` | `(server: simples.Server) => void` | `null`  |
| **return** | `simples.Server`                   |         |

Stop the server. Can have an optional callback. All connection in simpleS are
kept alive and the closing can take few seconds for closing alive http and ws
connections. While closing, no new connection will be accepted but existing
connections will be still served. When the server will be stopped the `stop`
event will be emitted. Returns current instance, so calls can be chained.

```js
server.stop((server) => {
    // Application logic
});

// Listen for the stop of the server
server.on('stop', (server) => {
    // Application logic
});
```

## Mirrors

```js
.mirror([port, options, callback])
```

`simpleS` provide a way to have multiple servers with the same hosts and routes
but on different ports and different configuration, this is done using mirror
servers.

See [Mirror docs][6] for detailed information.

## Virtual Hosting

```js
.host(name[, options])
```

`simpleS` allows having multiple HTTP hosts on the same server.

See [HTTPHost docs][1] for detailed information.

## Error Handling

Any server instance is an event emitter, all possible errors that may appear at
the level of the server can be caught using the usual error event listener
attached to the instance. It is recommended to attach error event listeners to
the server to prevent any undesired behavior.

```js
server.on('error', (error) => {
    // Handle any error that occurs at the server level
});
```