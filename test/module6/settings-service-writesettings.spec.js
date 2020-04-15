describe('services/settings-service.js', () => {
  const source = fs.readFileSync(path.join(process.cwd(), 'services/settings-service.js'), 'utf8');
  const selectFileService = jscs(source);

  it('should implement the `writeSettings()` function @settings-service-writesettings', () => {
    const writeSettings = selectFileService.findFunction("writeSettings")
    const settingsJson = writeSettings.findVariable("settingsJSON")

    const settingsJsonMatch = {
      "init.callee.object.name": "JSON",
      "init.callee.property.name": "stringify",
      "init.arguments[0].name": "newSettings"
    }
    assert(settingsJson.length && matchObj(settingsJson, settingsJsonMatch),
      "Are you parsing the settings object to a JSON string and assigning to `settingsJSON`?")

    const tryStatement = writeSettings.find(jscs.TryStatement)
    assert(tryStatement.length, "Are you using a `try` block?")

    const writeFileSync = tryStatement.findCall("writeFileSync")
    const writeFileSyncMatch = {
      "callee.object.name": "fs",
      "arguments[0].name": "settingsFilePath",
      "arguments[1].name": "settingsJSON"
    }
    assert(writeFileSync.length && matchObj(writeFileSync, writeFileSyncMatch),
    "Are you writing the settings file using `fs.writeFileSync`?")

    const tryReturn = tryStatement.findReturn()
    assert(tryReturn.length && tryReturn.__paths[0].node.argument.value === true,
      "Are you returning true after `fs.writeFileSync`?")

    const catchStatement = writeSettings.find(jscs.CatchClause)
    assert(catchStatement.length, "Did you forget the `catch` clause?")

    const catchReturn = catchStatement.findReturn()
    assert(catchReturn.length && catchReturn.__paths[0].node.argument.value === false,
      "Are you returning `false` in the `catch` clause?")
  });
});