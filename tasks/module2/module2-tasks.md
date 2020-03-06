# Adding the Websocket-based log viewer window

## Add a panel
TASK 1:
In `views/index.ejs` inside the existing `<div>` with class `container` below the title header, add another `<div>` element with classes of `panel` and `panel-default`. The `panel` and `panel-default` classes along with all other CSS classes used in this project are [Bootstrap classes](https://www.w3schools.com/bootstrap/default.asp)

## Add a panel header
TASK 2: 
In `views/index.ejs` inside the panel `<div>` created above, add another `<div>` with a class of `panel-heading`. For the `<div>` content add the text `"Log Viewer"`. 

## Add the log window
TASK 3: 
In `views/index.ejs` inside the `panel` `<div>` and after the `panel-heading` `<div>`, add a `<div>` with class `panel-body` and an `id` of `log-window`. For the `<div>` content add the text `"No logs to show"`.

## Create the log viewer javascript file
TASK 4:
At the root of the project create a directory called `public`. Inside that directory create a directory called `javascripts`. Inside the `public/javascripts` directory create a file called `log-viewer.js`

## Add the javascript file as a script on index.ejs
TASK 5:
In `views/index.ejs` after the closing `container` `<div>` tag, add a `<script>` tag and assign its `src` attribute to the static path of the `log-viewer.js` file `"/scripts/log-viewer.js"`. **Note**: the static assets directory is configured in `app.js` using the `express.static()` function.

## Create a WebSocket client connection object
TASK 6:
In `public/javascripts/log-viewer.js` create a `const` called `connection` and assign it to a new `WebSocket` instance passing the string `"ws://localhost:3000"` as the `WebSocket` constructor parameter. **Note**: `WebSocket` is part of the [web API](https://developer.mozilla.org/en-US/docs/Web/API/Websockets_API) and is provided by the browser so no need for a `require`.

## Get a reference to the log window
TASK 7: 
In `public/javascripts/log-viewer.js` create a `const` called `logWindow` and assign it as a reference to the `<div>` with `id="log-window"` using the `document.querySelector()` function.

## Send a message to the WebSocket server
TASK 8: 
In `public/javascripts/log-viewer.js` after the `const` declarations, assign a function to the `connection` object's `onopen` [event handler property](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/onopen) that sends a message to the server using the `connection.send()` function. Send the message `"Hello from the client!"`.

## Display the returned message in the log window
TASK 9: 
In `public/javascripts/log-viewer.js` after the `connection.onopen` assignment, assign a function with a parameter called `event` to the `connection` object's `onmessage` [event handler property](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/onmessage). The function should set the `innerHTML` property of the `logWindow` element to a string of the value of the `data` property of the `event` parameter. Format the string with a `<br>` tag before and after `event.data`. 

