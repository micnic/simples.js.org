---
id: ws-channel
title: WSChannel
sidebar_label: WSChannel
---

[WORK IN PROGRESS]

`.connections` - The collection of connections of the channel

`.bind(connection)` - Binds connections to the channel

`.broadcast([event, ]data[, filter])` - Sends a message to the connections of the channel

`.close()` - Drops all the connections from the channel, removes the channel

`.unbind(connection)` - Unbinds the connection from the channel