const sourceHtml = fs.readFileSync(path.join(process.cwd(), 'views/index.ejs'), 'utf8');
const $ = require("cheerio").load(sourceHtml);

describe('index.ejs', () => {
  it('Should add a `<div>` element with "panel panel-default" classes. @index-add-panel', () => {
    const divContainer = $('div[class="container"]')
    const divPanel = divContainer.children('div[class="panel panel-default"]')
    assert(divPanel.length, 'Have you added a `<div>` element with "panel panel-default" classes to the `index.ejs` file?');
  });
})