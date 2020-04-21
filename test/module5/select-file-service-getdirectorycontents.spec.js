describe('services/select-file-service.js', () => {
  const source = fs.readFileSync(path.join(process.cwd(), 'services/select-file-service.js'), 'utf8');
  const selectFileService = jscs(source);

  it('should implement getDirectoryContents() @select-file-service-getdirectorycontents', () => {
    const getDirectoryContents = selectFileService.findFunction("getDirectoryContents")
    const data = getDirectoryContents.findVariable("data")

    const dataMatch = {
      "init.type": "ArrayExpression"
    }

    assert(data.length && matchObj(data, dataMatch),
      "Are you creating an empty `data` array?")

    const filesForEach = getDirectoryContents.findCall("forEach")
    const filesForEachMatch = {
      "callee.object.name": "files",
      "arguments[0].params[0].name": "file"
    }
    assert(filesForEach.length && filesForEachMatch, 
      "Are you calling `forEach()` on the `files` parameter?")

    const ifStatement = filesForEach.findIf()
    assert(
      ifStatement 
      && ifStatement.test.callee.name === "isDirectory" 
      && ifStatement.test.arguments[0].name === "currentDir"
      && ifStatement.test.arguments[1].name === "file"
      && ifStatement.alternate.body[0].expression.callee.object.name === "data"
      && ifStatement.alternate.body[0].expression.callee.property.name === "push",
      "Are you checking if the file is a directory using `isDirectory()`")

    
    const arrPush = filesForEach.findCall("push")
    assert(
      arrPush.__paths[0].node.arguments[0].original.properties[0].key.name === "name"
      && arrPush.__paths[0].node.arguments[0].original.properties[0].value.name === "file"
      && arrPush.__paths[0].node.arguments[0].original.properties[1].key.name === "isDirectory"
      && arrPush.__paths[0].node.arguments[0].original.properties[1].value.value === true
      && arrPush.__paths[0].node.arguments[0].original.properties[2].key.name === "path"
      && arrPush.__paths[0].node.arguments[0].original.properties[2].value.callee.object.name === "path"
      && arrPush.__paths[0].node.arguments[0].original.properties[2].value.callee.property.name === "join"
      && arrPush.__paths[0].node.arguments[0].original.properties[2].value.arguments[0].name === "query"
      && arrPush.__paths[0].node.arguments[0].original.properties[2].value.arguments[1].name === "file",
      "Are you pushing an directory oject if the file is a directory?"
    )

    assert(
      arrPush.__paths[1].node.arguments[0].properties[0].key.name === "name"
      && arrPush.__paths[1].node.arguments[0].properties[0].value.name === "file"
      && arrPush.__paths[1].node.arguments[0].properties[1].key.name === "isDirectory"
      && arrPush.__paths[1].node.arguments[0].properties[1].value.value === false
      && arrPush.__paths[1].node.arguments[0].properties[2].key.name === "path"
      && arrPush.__paths[1].node.arguments[0].properties[2].value.callee.object.name === "path"
      && arrPush.__paths[1].node.arguments[0].properties[2].value.callee.property.name === "join"
      && arrPush.__paths[1].node.arguments[0].properties[2].value.arguments[0].name === "query"
      && arrPush.__paths[1].node.arguments[0].properties[2].value.arguments[1].name === "file"
      && arrPush.__paths[1].node.arguments[0].properties[3].key.name === "currentDir",
      "Are you pushing a file oject if it's a file?"
    )

    const returnStatement = getDirectoryContents.findReturn()
    assert(returnStatement.length && returnStatement.__paths[0].node.argument.name === "data")
  });
});