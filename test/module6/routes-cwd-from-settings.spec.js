describe('routes/index.js', () => {
  const source = fs.readFileSync(path.join(process.cwd(), 'routes/index.js'), 'utf8');
  const routes = jscs(source);

  it('should set the current directory from settings when loading the select file page @routes-cwd-from-settings', () => {
    const setCwd = routes.findCall("setcwd")
    const setCwdMatch = {
      "arguments[0].callee.name": "getDefaultDir",
      "callee.object.name": "fileService"
    }
    assert(setCwd.length && matchObj(setCwd, setCwdMatch),
      "Are you calling `fileService.setcwd()` using setting service's `getDefaultDir()`?")
  });
});