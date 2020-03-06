describe('log-viewer.js', () => {
  it('Should create the log-viewer.js file. @log-viewer-create', () => {
    assert(fs.existsSync(path.join(process.cwd(), "public/javascripts/log-viewer.js")),
      'Have you created the `log-viewer.js` file in `public/javascripts`?')
  });
})