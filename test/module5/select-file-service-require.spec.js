describe('services/select-file-service.js', () => {
  const source = fs.readFileSync(path.join(process.cwd(), 'services/select-file-service.js'), 'utf8');
  const selectFileService = jscs(source);

  it('should contain fs and path require @select-file-service-require', () => {
    const path = selectFileService.findVariable("path");

    const pathMatch = {
      "init.callee.name": "require",
      "init.arguments[0].value": "path"
    }
    assert(path.length && matchObj(path, pathMatch),
      "Are you importing `path` and assigning it to a `const` named `path`")

    const fs = selectFileService.findVariable("fs");

    const fsMatch = {
      "init.callee.name": "require",
      "init.arguments[0].value": "fs"
    }
    assert(fs.length && matchObj(fs, fsMatch),
      "Are you importing `fs` and assigning it to a `const` named `fs`")
  });
});