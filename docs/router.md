---
id: router
title: Router
sidebar_label: Router
---

[0]: #router-options
[1]: https://nodejs.org/api/zlib.html#zlib_class_options
[2]: logging.md
[3]: store.md#store-implementation

`simpleS` is easy to use with complex routing structures.

```js
const simples = require('simples');

const server = simples();

const router = server.router('/path/to/router');
```

## Router Instance

```js
router.router(location[, options])
```

| Argument   | Type                    | Default       |
|:----------:|-------------------------|---------------|
| `location` | `string`                | N/A, required |
| `options`  | `simples.RouterOptions` | `null`        |
| **return** | `simples.Router`        |               |

`location` argument specifies the relative path of the router to the parent
router.

`options` argument specifies router configuration which will be applied to the
routes and child routers by default. If it is not defined default router options
are used. Their structure is explained [below][0].

---

Router class is designed for advanced routing hierarchy, it allows the creation
of chains of routers and routes for splitting any application in smaller,
controllable parts. Server and HTTPHost classes inherit from the Router class,
they are the main routers in their contexts. Any option configured in the upper
level of the routing chain is inherited down to child routers.

## Router Options

Router options allows configuring the compression, CORS, logging, sessions,
static files and connections timeout. These options are applied to the current
router routes, child routers will inherit this configuration if it is not
overwritten in their configuration.

```js
{
    // Compression options
    compression: {

        // Activate the compression, by default the compression is disabled
        enabled: false,

        // Compression configuration
        // See more on https://nodejs.org/api/zlib.html#zlib_class_options
        options: null,

        // The preferred compression type, can be 'deflate' or 'gzip'
        // Default is 'deflate'
        preferred: 'deflate'
    },

    // CORS options
    cors: {

        // Allow HTTP credentials, by default credentials are disabled
        credentials: false,

        // Set of accepted headers
        headers: [],

        // Set of accepted methods
        // By default 'DELETE', 'GET', 'HEAD', 'POST', 'PUT' are accepted
        methods: ['DELETE', 'GET', 'HEAD', 'POST', 'PUT'],

        // Set the origins accepted by the host
        origins: []
    },

    // Logger options
    logger: {

        // Activate the logger, by default the logger is disabled
        enabled: false,

        // Logger format
        format: '',

        // Log function
        log: () => null,

        // Tokens function
        tokens: () => null
    },

    // Session options
    session: {

        // Activate the session, by default sessions are disabled
        enabled: false,

        // Session store
        // Default is simples memcached store (not for production use)
        store: simples.store(),

        // Timeout for session expiration in seconds, by default 1 hour
        timeout: 3600
    },

    // Static files options
    static: {

        // Activate the static files, by default they are disabled
        enabled: false,

        // List of accepted files as indexes for directories
        // By default only 'index.html' is served as index
        index: ['index.html'],

        // Location of the root directory that will serve the static files
        location: ''
    },

    // Connection keep alive timeout option
    timeout: {

        // Activate the connection keep alive timeout, by default it is disabled
        enabled: false,

        // Value for connection keep alive timeout, by default no value is set
        value: 0
    }
}
```

## Router Configuration

Every property of router options has a separated method to be configured.

### Compression
Configure router compression options.

```js
.compression(config)
```

| Argument   | Type                               | Default          |
|:----------:|------------------------------------|------------------|
| `config`   | `simples.RouterCompressionOptions` | `null`, required |
| **return** | `simples.Router`                   |                  |

`config` argument specifies the configuration options for router compression.
These options are:
- `enabled` - option for compression activation, it can be a boolean value or a
function for dynamic activation, this function will receive an argument which is
the connection and should return a boolean value to enable or disable
compression for this connection.
- `options` - option for compression configuration, see more information in
[Zlib class options][1].
- `preferred` - option to select the compression type, can be `deflate` or
`gzip`.

```js
router.compression({

    // Activate the compression, by default the compression is disabled
    enabled: false,

    // Compression configuration
    // See more on https://nodejs.org/api/zlib.html#zlib_class_options
    options: null,

    // The preferred compression type, can be 'deflate' or 'gzip'
    // Default is 'deflate'
    preferred: 'deflate'
});
```

### CORS
Configure router CORS options.

```js
.cors(config)
```

| Argument   | Type                        | Default          |
|:----------:|-----------------------------|------------------|
| `config`   | `simples.RouterCORSOptions` | `null`, required |
| **return** | `simples.Router`            |                  |

`config` argument specifies the configuration options for CORS requests.
These options are:
- `credentials` - option for enabling of sending of credentials on CORS
requests. By default no credentials are sent.
- `headers` - option for accepted headers of CORS requests. No accepted headers
are defined by default.
- `methods` - option for accepted methods of CORS requests. By default `DELETE`,
`GET`, `HEAD`, `POST`, `PUT` are accepted.
- `origins` - option for accepted origins of CORS requests. By default, the
server will accept requests only from the current host. To accept requests from
any origin use `'*'`, if this parameter is used as the first parameter then all
next origins are rejected. `'null'` is used for local file system origin
(localhost), use it on your own risk. These limitations will be applied on all
requests using CORS. The current host should not be added in the list, it is
accepted anyway. Examples of use:
```js
// Will accept requests only from these 3 hosts
['null', 'localhost', 'example.com']

// Will accept requests from all hosts except 'example.com'
['*', 'example.com']
```

```js
router.cors({

    // Allow HTTP credentials, by default credentials are disabled
    credentials: false,

    // Set of accepted headers
    headers: [],

    // Set of accepted methods
    // By default 'DELETE', 'GET', 'HEAD', 'POST', 'PUT' are accepted
    methods: ['DELETE', 'GET', 'HEAD', 'POST', 'PUT'],

    // Set the origins accepted by the host
    origins: []
});
```

### Logger
Configure router logger options.

```js
.logger(config)
```

| Argument   | Type                          | Default          |
|:----------:|-------------------------------|------------------|
| `config`   | `simples.RouterLoggerOptions` | `null`, required |
| **return** | `simples.Router`              |                  |

`config` argument specifies the configuration options for router logger.
These options are:
- `enabled` - option for logger activation, it can be a boolean value or a
function for dynamic activation, this function will receive an argument which is
the connection and should return a boolean value to enable or disable logger for
this connection.
- `format` - option for logger format, see [logging][2] for more information.
- `log` - option for logger function, see [logging][2] for more information.
- `tokens` - option for logger tokens, see [logging][2] for more information.

```js
router.logger({

    // Activate the logger, by default the logger is disabled
    enabled: false,

    // Logger format
    format: '',

    // Log function
    log: () => null,

    // Tokens function
    tokens: () => null
});
```

### Session
Configure router session options

```js
.session(config)
```

| Argument   | Type                           | Default          |
|:----------:|--------------------------------|------------------|
| `config`   | `simples.RouterSessionOptions` | `null`, required |
| **return** | `simples.Router`               |                  |

`config` argument specifies the configuration options for router session. These
options are:
- `enabled` - option for session activation, it can be a boolean value or a
function for dynamic activation, this function will receive an argument which is
the connection and should return a boolean value to enable or disable session
for this connection.
- `store` - option for session store container, by default it uses simpleS
memcached store which is not recommended for production use as it does not scale
and is not persistent. See [store implementation][3] for more information.
- `timeout` - option for session timeout, by default it is one hour.

```js
router.session({

    // Activate the session, by default sessions are disabled
    enabled: false,

    // Session store
    // Default is simpleS memcached store (not for production use)
    store: simples.store(),

    // Timeout for session expiration in seconds, by default 1 hour
    timeout: 3600
});
```

### Static

Configure router static files options.

```js
.static(config)
```

| Argument   | Type                          | Default          |
|:----------:|-------------------------------|------------------|
| `config`   | `simples.RouterStaticOptions` | `null`, required |
| **return** | `simples.Router`              |                  |

`config` argument specifies the configuration options for router static files.
These options are:
- `enabled` - option for static files activation, it can be a boolean value or a
function for dynamic activation, this function will receive an argument which is
the connection and should return a boolean value to enable or disable static
files for this connection.
- `index` - option for accepted index files, it is an array of strings which
represent the file names, by default only `index.html` is used as index files
for directories.
- `location` - option for location of root directory that will serve the static
files, by default no location is provided.

```js
router.static({

    // Activate the static files, by default static files are disabled
    enabled: false,

    // List of accepted files as indexes for directories
    // By default only 'index.html' is served as index
    index: ['index.html'],

    // Location of the root directory that will serve the static files
    location: ''
});
```

### Timeout

Configure router connections keep alive timeout options.

```js
.timeout(config)
```

| Argument   | Type                           | Default          |
|:----------:|--------------------------------|------------------|
| `config`   | `simples.RouterTimeoutOptions` | `null`, required |
| **return** | `simples.Router`               |                  |

`config` argument specifies the configuration options for connections keep alive
timeout. These options are:
- `enabled` - option for connections keep alive timeout activation, it can be a
boolean value or a function for dynamic activation, this function will receive
an argument which is the connection and should return a boolean value to enable
or disable static files for this connection.
- `value` - option for timeout value in milliseconds, by default no timeout
value is set.

```js
router.timeout({

    // Activate the connection keep alive timeout, by default it is disabled
    enabled: false,

    // Value for connection keep alive timeout, by default no value is set
    value: 0
});
```

## Routing

Requests are handled based on their HTTP method and path. To create a route use
any of the following methods depending on the application needs.

`.get(route, listener[, importer])` - listen for `GET` method requests

`.post(route, listener[, importer])` - listen for `POST` method requests

`.patch(route, listener[, importer])` - listen for `PATCH` method requests

`.put(route, listener[, importer])` - listen for `PUT` method requests

`.delete(route, listener[, importer])` - listen for `DELETE` method requests

`.all(route, listener[, importer])` - listen for any kind of accepted requests,
for defining more generic behavior

`.error(code, listener[, importer])` - listen for client (4XX) and server (5XX)
errors, as first parameter a number should be provided as a the HTTP error code.

These methods listen for requests and uses a callback function with connection
as parameter or a string for view rendering (see `Connection.render()`). The
`importer` parameter is used only if the listener is a string and define the
data for the view, as a function, the `callback` should provide an object as
parameter to be imported in the view. Returns current instance, so calls can be
chained.

