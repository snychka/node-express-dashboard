describe('bin/www', () => {
  it('should convert chunk to string and split into array @www-split-chunk', () => {
    const connection = ast.findLiteral('connection');
    assert(connection.length, "Do you have a `connection` parent listener for `message` listener?")

    const message = connection.findCall('on');
    assert(message.length, "Are you adding an `on` event listener to `ws` that listens for the `message` event?")

    const onData = message.findCall("on")
    assert(onData.length, 'Are you registering an event handler for the `ReadStream` instance\'s `"data"` event.')

    const logs = onData.findVariable('logs');
    const logsMatch = {
      "type": "VariableDeclarator",
      "init.callee.object.callee.object.name": "chunk",
      "init.callee.object.callee.property.name": "toString",
      "init.callee.property.name": "split",
      "init.arguments[0].value": "\n"
    };
    assert(matchObj(logs, logsMatch), 
      'Are you splitting `chunk` on newlines ("\n") and assigning the array to a `let` binding called `logs`');
  });
});