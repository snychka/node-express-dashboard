describe('bin/www', () => {
  it('should contain wss `connection` listener @www-register-connection-listener', () => {
    const connection = ast.findLiteral('connection');
    const wssOnMatch = {
      'callee.object.name': 'wss',
      'callee.property.name': 'on',
    };
    assert(matchObj(connection, wssOnMatch), 'Are you adding an `on` event listener to `wss` that listens for the `connection` event?');

    const connection_handler_arrow = { 
      'arguments.1.type': 'ArrowFunctionExpression',
      'arguments.1.params.0.name': 'ws'
    };
    const connection_handler_function = { 
      'arguments.1.type': 'FunctionExpression',
      'arguments.1.params.0.name': 'ws'
    };
    assert(matchObj(connection, connection_handler_arrow) || matchObj(connection, connection_handler_function), 'Do you have a `connection` event handler function with a `ws` parameter?');
  });
});