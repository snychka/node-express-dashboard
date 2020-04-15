const sourceHtml = fs.readFileSync(path.join(process.cwd(), 'views/index.ejs'), 'utf8');
const $ = require("cheerio").load(sourceHtml);

describe('index.ejs', () => {
  it('Should add a hidden `<input>` tag" classes. @index-add-input-tag', () => {
    const input = $('input[id="logFilePath"]')
    assert(input.length, 'Have you added a `<div>` element with "panel panel-default" classes to the `index.ejs` file?');
    assert(input.attr("id") === "logFilePath", "Did you add an `id` attribute with a value of `logFilePath`")
    assert(input.val("<%= logFile %>") || input.val("<%=logFile%>"), "Are you setting the `value` on the `<input>` tag")
  });
})