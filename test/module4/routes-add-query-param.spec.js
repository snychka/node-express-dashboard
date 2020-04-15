const fs = require('fs');
const path = require('path');

describe("routes/index.js", () => {
  it('`routes/index.js` should exist @routes-add-query-param', () => {
    assert(fs.existsSync(path.join(process.cwd(), 'routes')), 'The `routes` dir does not exist.');
    assert(
      fs.existsSync(path.join(process.cwd(), 'routes/index.js')),
      'The `routes/index.js` file does not exist.'
    );
    const source = fs.readFileSync(path.join(process.cwd(), 'routes/index.js'), 'utf8');
    const indexRoute = jscs(source);

    const render = indexRoute.findCall("render")
    const renderMatch = {
      'callee.object.name': 'res',
      'arguments.0.value': 'index',
      "arguments.1.properties.0.key.name": "title",
      "arguments.1.properties.1.key.name": "logFile",
      "arguments.1.properties.1.value.object.object.name": "req",
      "arguments.1.properties.1.value.object.property.name": "query",
      "arguments[1].properties[1].value.property.name": "logFile"
    };
    assert(matchObj(render, renderMatch), 'Are you adding a logFile property to the index route?');
  });
});