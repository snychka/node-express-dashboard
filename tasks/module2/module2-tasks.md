# Configuring Websockets on the server

## Require the ws module
TASK: 1
In `bin/www`, require the `ws` module and store a reference to it in a `const` called `WebSocket`. The `ws` module is imported via `package.json` and its npm package can be found [here](https://www.npmjs.com/package/ws)

## Create a Websocket using the existing Express server configuration
TASK: 1
In `bin/www` after the http `server` variable is created , add a `const` called `wss` and assign it to a new 
`WebSocket.Server` instance. The `WebSocket.Server` constructor requires an `options` object as an argument that conforms to the [`WebSocket.ServerOptions` interface.] (https://github.com/websockets/ws/blob/master/doc/ws.md#new-websocketserveroptions-callback) Use the existing http `server` variable
for the `options` object's `server` property.

## Register a listener for the WebSocket server "connection" event
TASK: 3
In `bin/www` after the `server.listen()` and `server.on()` function calls, add a listener for the WebSocket server "connection" event. Do this by invoking the `wss.on()` function and passing the string "connection" as the first argument and a callback function as the second argument with `ws` as the callback's single parameter.

## Register a listener for the WebSocket "message" event
TASK: 4
In `bin/www` inside the callback for the `wss` "connection" event, add a listener for the "message" event of the `ws` callback parameter added in the previous step. Do this by invoking the `ws.on()` function passing the string "message" as the first argument and a callback function as the second argument with `message` as the callback's single parameter.

## Send a simple WebSocket echo message to the client
TASK: 5
In `bin/www` inside the `ws.on("message", ...)` callback, add an echo back to the client. Do this by calling the `ws.send()` function and passing the string `"Hello from the server! You sent: "` with the `message` parameter appended to the end. For example, if the `message` from the client was `"Hello from the client"` the string sent from the server should evaluate to `"Hello from the server! You sent: Hello from the client"`.
