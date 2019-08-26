---
id: http-connection
title: HTTPConnection
sidebar_label: HTTPConnection
---

[WORK IN PROGRESS]

`.cookies` - An object that contains the cookies provided by the client

`.data` - A container for the data related to the connection but which may not be inside the session

`.headers` - An object that contains the HTTP headers of the request

`.host` - The host of the url of the request

`.hostname` - The hostname of the url of the request

`.ip` - An object that describes the remote ip address of the request

`.langs` - An array of strings that represents languages accepted by the client in the order of their relevance

`.method` - The HTTP method of the request

`.params` - The object that contains named parameters from the route

`.path` - The pathname of the url of the request

`.protocol` - The name of the protocol of the request, can be `http` or `https`

`.query` - The object that contains parsed query string from the url

`.request` - The Node.JS server request object instance, may be used for compatibility with some third party modules

`.response` - The Node.JS server response object instance, may be used for compatibility with some third party modules

`.session` - A container used to keep important data on the server-side

`.url` - The url of the request split in components

`.body()` - Parse received data from the request

`.cache([config])` - Set, get or remove Cache-Control header

`.close([callback])` - Close the connection

`.cookie(name, value[, attributes])` - Set a cookie

`.drain(location[, type, override])` - Write the content of a file to the response

`.error(code)` - Calls the error route with the provided code

`.header(name[, value])` - Set, get or remove a header of the response

`.keep([timeout])` - Set a timeout for inactivity on the connection socket

`.lang([value])` - Set or get the language of the content of the response

`.links([links])` - Define the relation of the current location with other locations

`.log([format, tokens, logger])` - Log data

`.redirect(location[, permanent])` - Redirect the client to a specific location

`.render(source[, imports, callback])` - Render from the template engine

`.send(data[, callback])` - Send preformatted data to the response stream

`.status([code])` - Set or get the status code of the response

`.type([type, override])` - Set, get or remove the type of the content of the response