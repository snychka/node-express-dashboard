describe('bin/www', () => {
  it('should send logs to client in real-time @www-send-real-time', () => {
    const connection = ast.findLiteral('connection');
    assert(connection.length, 
      "Do you have a `connection` parent listener for `message` listener?")

    const message = connection.findCall('on');
    assert(message.length, 
      "Are you adding an `on` event listener to `ws` that listens for the `message` event?")

    const watch = message.findCall("watch")
    const watchMatch = {
      "arguments[0].name": "filePath",
      "callee.object.name": "fs",
      "arguments[1].body.body[0].expression.callee.object.callee.object.name": "fs",
      "arguments[1].body.body[0].expression.callee.object.callee.property.name": "createReadStream"
    }
    assert(matchObj(watch, watchMatch), 
      'Are you using `fs.watch()` to watch for log file changes?')
  });
});