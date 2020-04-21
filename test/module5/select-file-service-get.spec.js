describe('services/select-file-service.js', () => {
  const source = fs.readFileSync(path.join(process.cwd(), 'services/select-file-service.js'), 'utf8');
  const selectFileService = jscs(source);

  it('should implement get() @select-file-service-get', () => {
    const get = selectFileService.findPropertyAssignment("exports", "get")
    const currentDir = get.findVariable("currentDir")
    assert(currentDir.length && currentDir.__paths[0].node.init.name === "dir",
      "Are you assigning the `dir` parameter to a variable named `currentDir`?")
    
    const query = get.findVariable("query")
    const queryMatch = {
      "init.operator": "||",
      "init.right.value": "",
      "init.left.object.object.name": "req",
      "init.left.object.property.name": "query",
      "init.left.property.name": "path"
    }

    assert(query.length && matchObj(query, queryMatch),
      "Are you assigning a variable named `query` correctly?")

    const ifStatement = get.findIf()
    assert(
      ifStatement 
      && ifStatement.consequent.body[0].expression.left.name === "currentDir"
      && ifStatement.consequent.body[0].expression.right.callee.object.name === "path"
      && ifStatement.consequent.body[0].expression.right.callee.property.name === "join"
      && ifStatement.consequent.body[0].expression.right.arguments[0].name === "currentDir"
      && ifStatement.consequent.body[0].expression.right.arguments[1].name === "query",
      "Are you checking if `query` is truthy and assigning `currentDir` correctly?")

    const readDir = get.findCall("readDir")
    const readDirMatch = {
      "arguments[0].name": "currentDir",
      "arguments[1].name": "res",
      "arguments[2].name": "query"
    }
    assert(readDir.length && matchObj(readDir, readDirMatch),
      "Are you calling `readDir()`?")
  });
});