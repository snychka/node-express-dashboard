describe('bin/www', () => {
  it('should send a message on the WebSocket @www-send-message', () => {
    const send = ast.findCall('send');
    const sendMatch = {
      'callee.object.name': 'ws',
      'callee.property.name': 'send',
    };
    assert(matchObj(send, sendMatch), 'Are you sending a message on the WebSocket?');
  });
});