---
id: store
title: Store
sidebar_label: Store
---

[0]: router.md#session
[1]: session.md

`simpleS` uses store implementations to deposit session objects.

```js
const simples = require('simples');

const store = simples.store();
```

## Memory Store

By default `simpleS` uses a memcached store for sessions, which is by design not
persistent, leaks memory, does not scale and is meant only for development
purpose. For production purpose a custom store implementation should be used. To
create a memory store `simples.store()` method should be called without any
parameters.

```js
const store = simples.store();
```

## Store Implementation

Third party store implementations have to implement four methods, `.get()`,
`.set()`, `.remove()` and `.update()`, to be compliant with the `simpleS`
session management system.

`.get(id)` - method to get a session by the session id from the store, it should
return a promise that resolves with the session or with `null` if the session
was not found.

`.set(id, session, timeout)` - method to save a session to the store providing
the session id, the session object and the session timeout, it should return a
promise that resolves in case of a successful save.

`.remove(id)` - method to remove a session from the store providing the session
id, it should return a promise that resolves in case of a successful removal.

`.update(id, timeout)` - method to update the session by providing session id
and the session timeout, it should return a promise that resolves in case of
successful update. This method is optional for store implementations, but it is
highly recommended as it is used to mark the session as active by updating its
timeout in case it was not modified but just accessed.

The easiest way to create a custom store is to use `simples.store()` method
called with an object as parameter, the object has to implement the required
methods for the store.

```js
const store = simples.store({

    // id: string
    get(id) {
        // Store get method implementation
        // Should return a promise
        // The returned promise should resolve with the session value if found
        // The returned promise should resolve with null if no session is found
    },

    // id: string
    // session: simples.Session
    // timeout: number
    set(id, session, timeout) {
        // Store set method implementation
        // Should return a promise
        // The returned promise should resolve in case of a successful save
    },

    // id: string
    remove(id) {
        // Store remove method implementation
        // Should return a promise
        // The returned promise should resolve in case of a successful removal
    }

    // id: string
    // timeout: number
    update(id, timeout) {
        // Store remove update implementation
        // Should return a promise
        // The returned promise should resolve in case of a successful update
    }
});
```

## Usage

Stores are used in the router configuration objects

```js
// On server creation the store is used inside the main host configuration
const server = simples();

server.config({         // Main router configuration
    session: {          // Main router session configuration
        enabled: true,  // Session enabled
        store           // Store instance
    }
});

// or use the shortcut method
server.session({        // Main router session configuration
    enabled: true,      // Session enabled
    store               // Store instance
});

// In the same way store instances can be used on host or router configuration
```

### See also
[Router session configuration][0]

[Session documentation][1]