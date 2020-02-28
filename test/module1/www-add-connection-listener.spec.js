describe('bin/www', () => {
  it('should contain wss "connection" listener @www-add-connection-listener', () => {
    const connection = ast.findLiteral('connection');
    const wssOnMatch = {
      'callee.object.name': 'wss',
      'callee.property.name': 'on',
    };
    assert(matchObj(connection, wssOnMatch), 'Are you adding an `on` event listener to `wss` that listens for the `connection` event?');
  });
});