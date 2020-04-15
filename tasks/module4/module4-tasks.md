# Displaying a log file in real-time

## Add file path as a query string
In `routes/index.ejs` on the route for `index` in the `options` object (the second argument to `res.render()`), add a property called `logFile` and assign it to the value of the HTTP request's `logFile` query parameter, e.g. `res.query.logFile`.

## Add a hidden input tag for the log file path
In `views/index.ejs` after the last `</div>` tag and before the `<script>` tag, add a hidden `<input>` tag with attributes `id="logFilePath"` and `value="<%= logFile %>"`. The `logFile` in the `value` attribute references the `logFile` property we passed from the route in `index.js`.

## Get the log file path from index.ejs
In `public/javascripts/log-viewer.js` after the `logWindow` `const`, create a `const` called `filePath` and assign it to the value of the `logFilePath` hidden input field. Hint: use `document.getElementById()`.

## Send the log file path to the WebSocket server
In `public/javascripts/log-viewer.js` in the `connection.onopen` function handler, check that the `filePath` `const` is valid, i.e. truthy, and, if so, send the `filePath` string to the WebSocket server.

## Require the fs module
In `bin/www` require the `fs` module and store a reference to it in a `const` called `fs` after the `require` for the `ws` module.

## Create ReadStream to read log file
In `bin/www` for the `ws.on("message", ...)` handler function, change the parameter from `message` to `filePath`. Inside the `"ws.on("message", ...)` event handler use `fs` module's `createReadStream` function to stream the file found at `filePath` to the client. Do this by passing the `filePath` parameter to `fs.createReadStream()`. `createReadStream` returns a `ReadStream` instance. Register an event handler for the `ReadStream` instance's `"data"` event. Use `chunk` as the parameter name for the `"data"` event handler.

## Convert chunk to string and split into array
In `bin/www` in the `ReadStream`'s `"data"` event handler, convert the `chunk` buffer to a `string` and use `string`s `split()` function to convert the `string` to an `array` split at newline characters, e.g. `"\n"`. Assign the array to a `let` binding called `logs`.

## Send newest entries first
In `bin/www` in the `ReadStream`'s `"data"` event handler, reverse the `logs` array using `array`'s `reverse()` function. Chain a call to `join()` on the reversed array to convert it back to a string. Join on new line characters, e.g. `"\n"` and assign it to the existing `logs` variable. Call `ws.send(logs)` to send the formatted logs back to the client.

## Send new log entries in real time
In `bin/www` use `fs`'s `watch` function to, as the name implies, watch for changes to the log file. Do this by adding `fs.watch()` as the callback for `ws.on()` instead of `fs.createReadStream()`. Pass `filePath` as the first parameter to `fs.watch()` and use the existing `fs.createReadStream()` function as the second parameter callback for `fs.watch()`. Do not pass a parameter to the `fs.watch()` callback function (`fs.createReadStream()`).

## Display the logs in the log window
In `public/javascripts/log-viewer.js` in the `connection.onmessage` function handler, replace new lines (`\n`) with a horizontal rule HTML tag (`<hr>`) on `event.data` and assign it to a `const` called `logs`. Set `logWindow.innerHTML` to `logs`. Hint: you can use `string`'s `replace()` function with a regex, but, building on what we did in `bin/www`, use `split()` and `join()` instead, e.g. `str.split("\n").join("<hr>")`. Start the app by running `npm start` in a terminal. Open a browser and go to the URL `http://localhost:3000?logFile={path}/node-express-dashboard/log-generator/sample.log`, e.g. `http://localhost:3000?logFile=/Users/tyler/code/node-express-dashboard/log-generator/sample.log`. You should see the logs updating in real time. Note: running `npm start` also starts a log generator script that simulates logs being generated from a server.