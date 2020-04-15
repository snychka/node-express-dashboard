describe('log-viewer.js', () => {
  it('should send the logFilePath to the WebSocket server @log-viewer-send-path-to-server', () => {
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

    const filePathIfStatement = logViewer.findIf()
    assert(filePathIfStatement, 'Do you have an `if` statement testing that filePath is valid before sending to the server?');

    assert(filePathIfStatement.test.name === "filePath" || (filePathIfStatement.test.operator === '!==' || filePathIfStatement.test.operator === '!=') &&
      (filePathIfStatement.test.right.value === "" &&  filePathIfStatement.test.left.name === 'filePath') ||
      (filePathIfStatement.test.left.value === "" && filePathIfStatement.test.right.name === 'filePath'),
      'Do you have an `if` statement testing that filePath is valid before sending to the server?')


    const send = logViewer.findCall('send');
    const sendMatch = {
      'callee.object.name': 'connection',
      'callee.property.name': 'send',
      'arguments.0.name': 'filePath'
    };
    assert(matchObj(send, sendMatch), 'Are you sending the `filePath` to the WebSocket server?');
  });
});