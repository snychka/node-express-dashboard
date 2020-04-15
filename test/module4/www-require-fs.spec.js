describe('bin/www', () => {
  it('should contain fs require @www-require-fs', () => {
    const fs = ast.findVariable("fs")
    const fsMatch = {
      "init.callee.name": "require",
      "init.arguments[0].value": "fs"
    }
    assert(fs.length && matchObj(fs, fsMatch),
      "Has the `fs` module been required and assigned to a `const` called `fs` in `www`?")
  });
});