describe('log-viewer.js', () => {
  it('should get a reference to the logFilePath input @log-viewer-get-log-file-path', () => {
    assert(fs.existsSync(path.join(process.cwd(), "public/javascripts/log-viewer.js")),
    'Have you created the `log-viewer.js` file in `public/javascripts`?')

    const source = fs.readFileSync(path.join(process.cwd(), 'public/javascripts/log-viewer.js'), 'utf8');
    const logViewer = jscs(source);
    
    const logFilePath = logViewer.findVariable('filePath');
    const logFilePathMatch = {
      'init.object.callee.object.name': 'document',
      'init.object.callee.property.name': 'getElementById',
      'init.object.arguments.0.value': 'logFilePath',
      'init.property.name': "value"
    };
    assert(matchObj(logFilePath, logFilePathMatch), 
      'Are you getting a reference to the logFilePath input field value using `document.getElementById()` to query?');
  });
});