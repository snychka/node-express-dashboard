describe('log-viewer.js', () => {
  it('should get a reference to the log window @log-viewer-get-log-window-ref', () => {
    assert(fs.existsSync(path.join(process.cwd(), "public/javascripts/log-viewer.js")),
    'Have you created the `log-viewer.js` file in `public/javascripts`?')

    const source = fs.readFileSync(path.join(process.cwd(), 'public/javascripts/log-viewer.js'), 'utf8');
    const logViewer = jscs(source);
    
    const logWindow = logViewer.findVariable('logWindow');
    const logWindowMatch = {
      'init.callee.object.name': 'document',
      'init.callee.property.name': 'querySelector',
      'init.arguments.0.value': '#log-window'
    };
    assert(matchObj(logWindow, logWindowMatch), 'Are you getting a reference to the log window using `document.querySelector()`');
  });
});