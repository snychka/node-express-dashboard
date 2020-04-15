const connection = new WebSocket('ws://localhost:3000');
const logWindow = document.querySelector('#log-window');

//const filePath = document.getElementById("#logFilePath").value;
const filePath = document.getElementById("logFilePath").value;

// 1st doesn't work, 2nd does (I think 1st may be wrong or different)
//connection.onopen = () => connection.send("Hello from the client!");
//connection.onopen = () => {connection.send("Hello from the client!")};
connection.onopen = function() {

  if (filePath) {
    connection.send(filePath);
  }
  connection.send("Hello from the client!");

};

//connection.onmessage= function(event) {logWindow.innerHTML = event.data;}
connection.onmessage = (event) => {
  //logWindow.innerHTML = event.data;
  const logs = event.data.split('\n').join('<hr>');
  logWindow.innerHTML = logs;
}
