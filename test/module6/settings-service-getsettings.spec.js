describe('services/settings-service.js', () => {
  const source = fs.readFileSync(path.join(process.cwd(), 'services/settings-service.js'), 'utf8');
  const selectFileService = jscs(source);

  it('should implement the `getSettings()` function @settings-service-getsettings', () => {
    const getSettings = selectFileService.findFunction("getSettings")
    const settingsData = getSettings.findVariable("settingsData")

    const settingsDataMatch = {
      "init.callee.object.name": "fs",
      "init.callee.property.name": "readFileSync",
      "init.arguments[0].name": "settingsFilePath"
    }
    assert(settingsData.length && matchObj(settingsData, settingsDataMatch),
      "Are you reading the settings file into a `const` called `settingsData`?")

    const returnStatement = getSettings.findReturn()
    const returnStatementMatch = {
      "argument.callee.object.name": "JSON",
      "argument.callee.property.name": "parse",
      "argument.arguments[0].name": "settingsData"
    }
    assert(returnStatement.length && matchObj(returnStatement, returnStatementMatch),
      "Are you returning the parsed settings file?")
  });
});