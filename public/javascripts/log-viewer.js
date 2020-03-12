const connection = new WebSocket('ws://localhost:3000');
const logWindow = document.querySelector('#log-window');

// 1st doesn't work, 2nd does (I think 1st may be wrong or different)
//connection.onopen = () => connection.send("Hello from the client!");
//connection.onopen = () => {connection.send("Hello from the client!")};
connection.onopen = function() {connection.send("Hello from the client!");};

//connection.onmessage= function(event) {logWindow.innerHTML = event.data;}
connection.onmessage = (event) => {
  logWindow.innerHTML = event.data
}
