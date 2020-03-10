const sourceHtml = fs.readFileSync(path.join(process.cwd(), 'views/index.ejs'), 'utf8');
const $ = require("cheerio").load(sourceHtml);

describe('index.ejs', () => {
  it('Should add a `<script>` element. @index-add-script', () => {
    assert($('body').children().is('script[src="/javascripts/log-viewer.js"]'),
      'Did you add a `<script>` tag with "src" attribute set to "/javascripts/log-viewer.js"?')
  });
})