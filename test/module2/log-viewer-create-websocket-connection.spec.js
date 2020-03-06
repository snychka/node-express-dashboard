describe('log-viewer.js', () => {
  it('should create a new WebSocket connection variable @log-viewer-create-websocket-connection', () => {
    assert(fs.existsSync(path.join(process.cwd(), "public/javascripts/log-viewer.js")),
    'Have you created the `log-viewer.js` file in `public/javascripts`?')

    const source = fs.readFileSync(path.join(process.cwd(), 'public/javascripts/log-viewer.js'), 'utf8');
    const logViewer = jscs(source);
    
    const connection = logViewer.findVariable('connection');
    const connectionMatch = {
      'init.callee.name': 'WebSocket',
      'init.type': 'NewExpression',
      'init.arguments.0.value': "ws://localhost:3000"
    };
    assert(matchObj(connection, connectionMatch), 'Are you creating a `const` variable called ' + 
      '`connection` and assigning it to a new WebSocket instance?');
  });
});