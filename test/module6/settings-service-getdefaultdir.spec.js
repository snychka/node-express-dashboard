describe('services/settings-service.js', () => {
  const source = fs.readFileSync(path.join(process.cwd(), 'services/settings-service.js'), 'utf8');
  const selectFileService = jscs(source);

  it('should implement the `getDefaultDir()` function @settings-service-getdefaultdir', () => {
    const getDefaultDir = selectFileService.findFunction("getDefaultDir")
    const defaultDir = getDefaultDir.findVariable("defaultDir")
    const defaultDirMatch = {
      "init.object.callee.name": "getSettings",
      "init.property.name" : "defaultDir"
    }
    assert(defaultDir.length && matchObj(defaultDir, defaultDirMatch),
      "Are you parsing the settings object to a JSON string and assigning to `settingsJSON`?")

    const ifStatement = getDefaultDir.findIf()
    assert(
      ifStatement 
      && ifStatement.test.operator === "!"
      && ifStatement.test.argument.name === "defaultDir"
      && ifStatement.consequent.body[0].argument.callee.object.name === "process"
      && ifStatement.consequent.body[0].argument.callee.property.name === "cwd"
      && ifStatement.consequent.body[0].type === "ReturnStatement",
      "Are you checking for the truthiness of `defaultDir and returning `process.cwd()`?"
    ) 

    const returnStatement = getDefaultDir.findReturn()
    assert(
      returnStatement.length
      && returnStatement.__paths[1].node.argument.test.callee.name === "isValidDir"
      && returnStatement.__paths[1].node.argument.test.arguments[0].name === "defaultDir"
      && returnStatement.__paths[1].node.argument.alternate.callee.object.name === "process"
      && returnStatement.__paths[1].node.argument.alternate.callee.property.name === "cwd"
      && returnStatement.__paths[1].node.argument.consequent.name === "defaultDir"
    )
  });
});