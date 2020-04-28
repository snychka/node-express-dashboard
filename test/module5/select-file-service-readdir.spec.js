describe('services/select-file-service.js', () => {
  const source = fs.readFileSync(path.join(process.cwd(), 'services/select-file-service.js'), 'utf8');
  const selectFileService = jscs(source);

  it('should implement readDir() @select-file-service-readdir', () => {
    const readDir = selectFileService.findFunction("readDir")
    const fsReadDir = readDir.findCall("readdir")

    const fsReadDirMatch = {
      "callee.object.name": "fs",
      "arguments[0].name" : "currentDir",
    }

    assert(fsReadDir.length && matchObj(fsReadDir, fsReadDirMatch),
      "Are you using `fs.readdir()` (all lowercase) to read the current directory?")

    const fsReadDirArrowFunction = {
      'arguments.1.type': 'ArrowFunctionExpression',
      'arguments.1.params.0.name': 'err',
      'arguments.1.params.1.name': 'files',
    };
    const fsReadDirHandlerFunction = {
      'arguments.1.type': 'FunctionExpression',
      'arguments.1.params.0.name': 'err',
      'arguments.1.params.1.name': 'files',
    };
    assert(matchObj(fsReadDir, fsReadDirArrowFunction) || matchObj(fsReadDir, fsReadDirHandlerFunction),
      'Are you passing the correct callback function to `fs.readdir()`');

    const directoryContents = fsReadDir.findVariable("directoryContents")
    assert(directoryContents && directoryContents.__paths[0].node.init.type === "ArrayExpression",
      "Are you initializing an empty array called `directoryContents`")
    
    const ifStatement = fsReadDir.findIf()
    assert(
      ifStatement 
      && ifStatement.test.argument.name === "err"
      && ifStatement.test.operator === "!"
      && ifStatement.consequent.body[0].expression.right.callee.name === "getDirectoryContents"
      && ifStatement.consequent.body[0].expression.right.arguments[0].name === "files"
      && ifStatement.consequent.body[0].expression.right.arguments[1].name === "currentDir"
      && ifStatement.consequent.body[0].expression.right.arguments[2].name === "query"
      && ifStatement.consequent.body[0].expression.left.name === "directoryContents",
      "If no `err`, are you assigning `directoryContents` using `getDirectoryContents()`")

    const resJson = fsReadDir.findCall("json")
    const resJsonMatch = {
      "callee.object.name": "res",
      "arguments[0].name": "directoryContents"
    }
    assert(resJson.length && matchObj(resJson, resJsonMatch),
      "Are you passing `directoryContents` to `res.json()`")
  });
});