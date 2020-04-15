describe('services/select-file-service.js', () => {
  const source = fs.readFileSync(path.join(process.cwd(), 'services/select-file-service.js'), 'utf8');
  const selectFileService = jscs(source);

  it('should set `dir` global @select-file-service-add-dir', () => {
    const dir = selectFileService.findVariable("dir")

    const dirMatch = {
      "init.callee.object.name": "process",
      "init.callee.property.name" : "cwd",
    }

    assert(dir.length && matchObj(dir, dirMatch),
      "Are you assigning a global `const` named `dir` to `process.cwd()`?")
  });
});