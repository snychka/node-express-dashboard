describe('bin/www', () => {
  it('should create ReadStream to read log file @www-read-log-file', () => {
    const connection = ast.findLiteral('connection');
    try {
      connection.findCall("on")
    }
    catch {
      assert.fail("No `connection` parent listener for `message` listener")
    }
    const message = connection.findCall('on');
    const messageMatch = {
      'callee.object.name': 'ws',
      'callee.property.name': 'on',
      'arguments.0.value': 'message',
    };
    assert(matchObj(message, messageMatch),
      'Are you adding an `on` event listener to `ws` that listens for the `message` event?');
    
    const messageArrowFunction = {
      'arguments.1.type': 'ArrowFunctionExpression',
      'arguments.1.params.0.name': 'filePath'
    };
    const messageHandlerFunction = {
      'arguments.1.type': 'FunctionExpression',
      'arguments.1.params.0.name': 'filePath'
    };
    assert(matchObj(message, messageArrowFunction) || matchObj(message, messageHandlerFunction),
      'Do you have a `message` event handler function with a `filePath` parameter?');

    const createReadStream = connection.findLiteral("message").findCall("createReadStream")
    const createReadStreamMatch = {
      'callee.object.name': 'fs',
      'callee.property.name': 'createReadStream',
      'arguments[0].name': 'filePath',
    }
    assert(createReadStream.length && matchObj(createReadStream, createReadStreamMatch),
      'Did you add `fs.createReadStream()` as the callback for `ws.on("message",...)`?')

    const onData = message.findCall("on")
    const onDataMatch = {
      "callee.object.callee.object.name": "fs",
      "callee.object.callee.property.name": "createReadStream",
      "callee.object.arguments[0].name": "filePath",
      "arguments[0].value": "data",
    };
    
    assert(onData && matchObj(onData, onDataMatch),
      'Did you register an event handler for the `ReadStream` instance\'s `"data"` event?')

    const onDataArrowFunction = {
      'arguments.1.type': 'ArrowFunctionExpression',
      'arguments.1.params.0.name': 'chunk'
    };
    const onDataHandlerFunction = {
      'arguments.1.type': 'FunctionExpression',
      'arguments.1.params.0.name': 'chunk'
    };
    assert(matchObj(onData, onDataArrowFunction) || matchObj(onData, onDataHandlerFunction),
      'Did you use `chunk` as the parameter name for the `"data"` event handler');
  });
});