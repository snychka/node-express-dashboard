describe('services/settings-service.js', () => {
  const source = fs.readFileSync(path.join(process.cwd(), 'services/settings-service.js'), 'utf8');
  const selectFileService = jscs(source);

  it('should Get a global reference to the settings file path @settings-service-file', () => {
    const settingsFilePath = selectFileService.findVariable("settingsFilePath");

    const pathMatch = {
      "init.callee.object.name": "path",
      "init.callee.property.name" : "join",
      "init.arguments[0].name": "__dirname",
      "init.arguments[1].value": "../json/settings.json"
    }
    assert(settingsFilePath.length && matchObj(settingsFilePath, pathMatch),
      "Are you setting the `settingsFilePath` `const` as the settings json file?")
  });
});