describe('log-viewer.js', () => {
  it('should send a message to the WebSocket server @log-viewer-send-message', () => {
    assert(fs.existsSync(path.join(process.cwd(), "public/javascripts/log-viewer.js")),
    'Have you created the `log-viewer.js` file in `public/javascripts`?')

    const source = fs.readFileSync(path.join(process.cwd(), 'public/javascripts/log-viewer.js'), 'utf8');
    const logViewer = jscs(source);
    
    const onopen = logViewer.findPropertyAssignment('connection', 'onopen');
    const onopenAssignmentMatch = {
      "operator": "=",
      "type": "AssignmentExpression"
    }
    assert(matchObj(onopen, onopenAssignmentMatch), 'Are you assigning a function handler to `connection.onopen`?');

    const onopenArrowFunction = { 
      'right.type': 'ArrowFunctionExpression', 
    };
    const onopenHandlerFunction = { 
      'right.type': 'FunctionExpression',
    };
    assert(matchObj(onopen, onopenArrowFunction) || matchObj(onopen, onopenHandlerFunction), 'Are you assigning a handler function to `connection.onopen`?');

    const onopenMatch = {
      "right.body.body[0].expression.callee.object.name": "connection",
      "right.body.body[0].expression.callee.property.name": "send"
    }
    assert(matchObj(onopen, onopenMatch), 'Are you calling `connection.send()` in the `connection.on` handler function?');

    const send = logViewer.findCall('send');
    const sendMatch = {
      'callee.object.name': 'connection',
      'callee.property.name': 'send',
      'arguments.0.value': 'Hello from the client!'
    };
    assert(matchObj(send, sendMatch), 'Are you sending the string `"Hello from the client!"` to the WebSocket server?');
  });
});