describe('bin/www', () => {
  it('should send newest log entries first @www-new-entries-first', () => {
    const connection = ast.findLiteral('connection');
    assert(connection.length, "Do you have a `connection` parent listener for `message` listener?")

    const message = connection.findCall('on');
    assert(message.length, "Are you adding an `on` event listener to `ws` that listens for the `message` event?")

    const onData = message.findCall("on")
    assert(onData.length, 'Are you registering an event handler for the `ReadStream` instance\'s `"data"` event.')

    const logs = onData.findCall('join');
    const logsMatch = {
      "callee.object.callee.property.name": "reverse",
      "callee.object.callee.object.name": "logs",
      "arguments[0].value": "\n"
    };
    assert(matchObj(logs, logsMatch), 
      'Are you reversing the `logs` array and converting it back to a `string` with newline delimiters?');

    const send = onData.findCall('send');
    const sendMatch = {
      'callee.object.name': 'ws',
      'callee.property.name': 'send',
      'arguments[0].name': "logs"
    };
    assert(matchObj(send, sendMatch), 'Are you sending `logs` back to the client?');
  });
});