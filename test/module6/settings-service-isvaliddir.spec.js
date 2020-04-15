describe('services/settings-service.js', () => {
  const source = fs.readFileSync(path.join(process.cwd(), 'services/settings-service.js'), 'utf8');
  const selectFileService = jscs(source);

  it('should implement the `isValidDir()` function @settings-service-isvaliddir', () => {
    const isValidDir = selectFileService.findFunction("isValidDir")
    const tryStatement = isValidDir.find(jscs.TryStatement)
    assert(tryStatement.length, "Are you using a `try` block?")

    const readDirSync = tryStatement.findCall("readdirSync")
    const readDirSyncMatch = {
      "callee.object.name": "fs",
      "arguments[0].name": "dirPath",
    }
    assert(readDirSync.length && matchObj(readDirSync, readDirSyncMatch),
    "Are you checking if the directory is valid using `fs.readdirSync()`?")

    const tryReturn = tryStatement.findReturn()
    assert(tryReturn.length && tryReturn.__paths[0].node.argument.value === true,
      "Are you returning true after `fs.readdirSync()`?")

    const catchStatement = isValidDir.find(jscs.CatchClause)
    assert(catchStatement.length, "Did you forget the `catch` clause?")

    const catchReturn = catchStatement.findReturn()
    assert(catchReturn.length && catchReturn.__paths[0].node.argument.value === false,
      "Are you returning `false` in the `catch` clause?")
  });
});