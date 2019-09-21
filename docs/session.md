---
id: session
title: Session
sidebar_label: Session
---

[0]: router.md#session
[1]: store.md

`simpleS` allows storing data persisting between HTTP and WS connections.

When enabled, sessions are accessible in HTTP and WS connections as a `Map`-like
member with some special properties and methods.

```js
connection.session
```

## Inheritance from Map
Session objects inherit from Map class with the `.set(key, value)` method
overwritten, `key` argument can be only a string value. Any manipulation of the
data entries set the `.changed` property to true, this marks the session to be
saved into the store.

## Session properties
### .id
Every session has it's own `.id` property to distinguish them from other data
saved in the store. This id is also provided in the HTTP cookies, it is
automatically sent and parsed when new requests are received.

### .changed
Only modified sessions are saved to the store, to mark them as modified the
`.changed` property is set to true. This property is automatically set to true
when any method that adds, modifies or removes a data entry is called.

### .timeout and .expiration
Sessions have a `.timeout` and `.expiration` property to mark how long sessions
can live. Every time the session is saved or accessed from the store the
expiration time is increased based on its timeout.

### .store
Sessions provide access to the their store via the `.store` property for any
uses case outside of the functional provided by the methods that work with the
store.

## Session methods

### .load()
Load or reload the session data from the store based on its id. This method is
automatically called on connection creation, it can be useful to reload session
data from the store if the current data is stale. This method returns a promise
that resolves with the session value.

### .save()
Save the current session to the store. This method is automatically called on
connection close, it can be useful when the data needs to be saved while the
connection is still active. This method returns a promise that resolves with the
session value.

### .destroy()
Remove the session from the store. This method returns a promise.

### .generate()
Generate a new session id and set the `.changed` property to true. This method
returns a promise that resolves with the session value.

### .update()
Update the session expiration time. This method is called automatically when
it is needed by other methods.

### See also
[Router session configuration][0]

[Store documentation][1]