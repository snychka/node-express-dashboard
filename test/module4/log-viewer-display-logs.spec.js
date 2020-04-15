describe('log-viewer.js', () => {
  it('should display the formatted message from the WebSocket server @log-viewer-display-logs', () => {
    assert(fs.existsSync(path.join(process.cwd(), "public/javascripts/log-viewer.js")),
      'Have you created the `log-viewer.js` file in `public/javascripts`?')

    const source = fs.readFileSync(path.join(process.cwd(), 'public/javascripts/log-viewer.js'), 'utf8');
    const logViewer = jscs(source);
    
    const onmessage = logViewer.findPropertyAssignment('connection', 'onmessage');
    assert(onmessage.length, 
      'Are you assigning a function handler to `connection.onmessage` with an `event` param?')

    const eventData = onmessage.findCall("join")
    const eventDataMatch = {
      "arguments[0].value": "<hr>",
      "callee.object.callee.object.object.name": "event",
      "callee.object.callee.object.property.name": "data",
      "callee.object.callee.property.name": "split",
      "callee.object.arguments[0].value": "\n"
    }
    assert(matchObj(eventData, eventDataMatch),
      "Are you replacing new lines (`\n`) with `<hr>` on `event.data`")

    const onmessageMatch = {
      "right.body.body[1].expression.left.object.name": "logWindow",
      "right.body.body[1].expression.left.property.name": "innerHTML",
      "right.body.body[1].expression.right.name" : "logs"
    }
    assert(matchObj(onmessage, onmessageMatch), 
      'Are you setting the `innerHTML` property of `logWindow` to `logs`?');
  });
});