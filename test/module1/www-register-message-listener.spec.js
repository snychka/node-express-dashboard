describe('bin/www', () => {
  it('should contain ws "message" listener @www-register-message-listener', () => {
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
    assert(matchObj(message, messageMatch), 'Are you adding an `on` event listener to `ws` that listens for the `message` event?');
    
    const messageArrowFunction = { 
      'arguments.1.type': 'ArrowFunctionExpression',
      'arguments.1.params.0.name': 'message'
    };
    const messageHandlerFunction = { 
      'arguments.1.type': 'FunctionExpression',
      'arguments.1.params.0.name': 'message'
    };
    assert(matchObj(message, messageArrowFunction) || matchObj(message, messageHandlerFunction), 'Do you have a `message` event handler function with a `message` parameter?');
  });
});