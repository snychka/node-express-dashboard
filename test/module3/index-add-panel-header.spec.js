const sourceHtml = fs.readFileSync(path.join(process.cwd(), 'views/index.ejs'), 'utf8');
const $ = require("cheerio").load(sourceHtml);

describe('index.ejs', () => {
  it('Should add a `<div>` element with `panel-heading` class. @index-add-panel-header', () => {
    const divContainer = $('div[class="container"]')
    const divPanel = divContainer.children('div[class="panel panel-default"]')
    const divHeading = divPanel.children('div[class="panel-heading"]')
    assert(divHeading, 'Have you added a `<div>` element with `panel-heading` class `index.ejs`?')
    const headingText = divHeading.text()
    assert(headingText === "Log Viewer", 'Did you add the text `"Log Viewer"` to the `<div>` element with class `panel-heading`?')
  });
})