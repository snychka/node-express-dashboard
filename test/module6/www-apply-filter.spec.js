describe('bin/www', () => {
  it('should apply filter from settings @www-apply-filter', () => {
    let getSettings;
    try {
      getSettings = wwwModule.__get__('getSettings');
    } catch (err) {
      assert(getSettings !== undefined, 'Did you import `getSettings` in `www` from settings service?');
    }

    const connection = ast.findLiteral('connection');
    assert(connection.length, "Do you have a `connection` parent listener for `message` listener?")

    const message = connection.findCall('on');
    assert(message.length, "Are you adding an `on` event listener to `ws` that listens for the `message` event?")

    const onData = message.findCall("on")
    assert(onData.length, 'Are you registering an event handler for the `ReadStream` instance\'s `"data"` event.')

    const ifStatement = onData.findIf()
    assert(
      ifStatement
      && ifStatement.test.object.name === "settings"
      && ifStatement.test.property.name === "filter"
      && ifStatement.consequent.body[0].expression.left.name === "logs"
      && ifStatement.consequent.body[0].expression.operator === "="
      && ifStatement.consequent.body[0].expression.right.callee.object.name === "logs"
      && ifStatement.consequent.body[0].expression.right.callee.property.name === "filter"
      && ifStatement.consequent.body[0].expression.right.arguments[0].params[0].name === "line"
      && ifStatement.consequent.body[0].expression.right.arguments[0].body.argument.callee.object.name === "line"
      && ifStatement.consequent.body[0].expression.right.arguments[0].body.operator === "!"
      && ifStatement.consequent.body[0].expression.right.arguments[0].body.argument.callee.property.name === "includes"
      && ifStatement.consequent.body[0].expression.right.arguments[0].body.argument.arguments[0].object.name === "settings"
      && ifStatement.consequent.body[0].expression.right.arguments[0].body.argument.arguments[0].property.name === "filter",
      "Are you checking if `settings.filter` is truthy and then applying the filter to `logs`?"
    )
  });
});