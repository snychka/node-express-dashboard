describe('services/select-file-service.js', () => {
  const source = fs.readFileSync(path.join(process.cwd(), 'services/select-file-service.js'), 'utf8');
  const selectFileService = jscs(source);

  it('should export setcwd @select-file-service-export', () => {
    const setCwd = selectFileService.findPropertyAssignment("exports", "setcwd")
    const setCwdMatch = {
      "right.body.body[0].expression.left.name": "dir",
      "right.params[0].name": "cwd",
      "right.body.body[0].expression.right.name": "cwd"
    }
    assert(setCwd.length && matchObj(setCwd, setCwdMatch),
      "Are you exporting `setcwd` using `cwd` as the parameter?")
  });
});