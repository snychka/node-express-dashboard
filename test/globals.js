const fs = require('fs');
const path = require('path');
const rewire = require('rewire');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { mockReq, mockRes } = require('sinon-express-mock');
const jscs = require('jscodeshift');
const dot = require('dot-object');

const packageFile = require("../package.json")

const temp_app = fs.readFileSync(path.join(process.cwd(), 'app.js'), 'utf8');
const overwritten = temp_app.replace(/app\.listen\([\s\S]*\);?/g, 'app.listen(3000);')
fs.writeFileSync(path.join(process.cwd(), 'temp_app.js'), overwritten , 'utf8')
const appModule = rewire(path.join(process.cwd(), 'temp_app.js'));
fs.unlinkSync(path.join(process.cwd(), 'temp_app.js'))
chai.use(sinonChai);


const source = fs.readFileSync(path.join(process.cwd(), 'bin/www'), 'utf8');
const ast = jscs(source);

jscs.registerMethods({
  findFunction: function(name) {
    const element = this.find(jscs.Identifier, { name: name }).filter(path => {
      if(path.parent.value.type === 'VariableDeclarator') {
        if (path.parent.value.init.type === 'FunctionExpression' || 
            path.parent.value.init.type === 'ArrowFunctionExpression') {
          return true;
        }
        return false;
      } else if (path.parent.value.type === 'FunctionDeclaration') {
        return true;
      } else {
        return false;
      }
    });
    return (element.length) ? jscs(element.get().parent) : [];
  },
  findVariable: function(name) {
    return this.find(jscs.VariableDeclarator).filter(path => (path.value.id.name === name));
  },
  findPropertyAssignment: function(obj, property) {
    return this.find(jscs.AssignmentExpression).filter(path => {
      if (path.value.left.type === 'MemberExpression' &&
          path.value.left.object.name === obj &&
          path.value.left.property.name === property) {
        return true;
      } else {
        return false;
      }
    });
  },
  findAssignment: function(name) {
    return this.find(jscs.AssignmentExpression).filter(path => (path.value.left.type === 'Identifier' && path.value.left.name === name));
  },
  findCall: function(name) {
    return this.find(jscs.CallExpression).filter(path => {
      let callee_name = '';
      if (path.value.callee.type === 'Identifier') {
        callee_name = path.value.callee.name;
      } if (path.value.callee.type === 'MemberExpression') {
        callee_name = path.value.callee.property.name;
      }
      return (callee_name === name) ? true : false;
    }); 
  },
  findIf: function() {
    const element = this.find(jscs.IfStatement);
    return (element.length) ? element.get().value : [];
  },
  findReturn: function() {
    return this.find(jscs.ReturnStatement);
  },
  findLiteral: function(name) {
    const element = this.find(jscs.Literal).filter(path => (path.value.value === name));
    return (element.length) ? jscs(element.get().parent) : [];
  }
});

const matchObj = (obj, match_obj) => ((obj.length) ? jscs.match(obj.get().value, dot.object(match_obj)) : false);
const match = (obj, match_obj) => jscs.match(obj, dot.object(match_obj));



let app;
try {
  app = appModule.__get__('app');
} catch (err) {
  app = undefined;
}

const wwwModule = rewire(path.join(process.cwd(), 'bin/www'));

const getRouteMethods = route => {
  const methods = [];
  for (const method in route.methods) {
    if (method === '_all') {
      continue;
    }
    methods.push(method);
  }
  return methods;
};
const hasParams = value => {
  const regExp = /\(\?:\(\[\^\\\/]\+\?\)\)/g;
  return regExp.test(value);
};
const getAllStacks = (app, path, endpoints) => {
  if (typeof app === 'undefined') {
    return undefined;
  }

  const regExp = /^\/\^\\\/(?:(:?[\w\\.-]*(?:\\\/:?[\w\\.-]*)*)|(\(\?:\(\[\^\\\/]\+\?\)\)))\\\/.*/;
  const stack = app.stack || (app._router && app._router.stack);

  if (typeof stack === 'undefined') {
    return undefined;
  }

  endpoints = endpoints || [];
  path = path || '';

  stack.forEach(val => {
    if (val.route) {
      endpoints.push({
        path: getRouteMethods(val.route)[0] + ' ' + path + (path && val.route.path === '/' ? '' : val.route.path),
        stack: val.route.stack[0]
      });
    } else if (val.name === 'router' || val.name === 'bound dispatch') {
      let newPath = regExp.exec(val.regexp);

      if (newPath) {
        let parsedRegexp = val.regexp;
        let keyIndex = 0;

        while (hasParams(parsedRegexp)) {
          parsedRegexp = parsedRegexp.toString().replace(/\(\?:\(\[\^\\\/]\+\?\)\)/, ':' + val.keys[keyIndex].name);
          keyIndex++;
        }

        if (parsedRegexp !== val.regexp) {
          newPath = regExp.exec(parsedRegexp);
        }

        const parsedPath = newPath[1].replace(/\\\//g, '/');
        getAllStacks(val.handle, path + '/' + parsedPath, endpoints);
      } else {
        getAllStacks(val.handle, path, endpoints);
      }
    }
  });
  return endpoints;
};

const routeStack = (path, method) => {
  const allStacks = getAllStacks(app) || [];
  let found;
  allStacks.forEach(stack => {
    if (stack.path === method + ' ' + path) {
      found = stack.stack;
    }
  });
  return found || undefined;
};

Object.assign(global, {
  assert: chai.assert,
  expect: chai.expect,
  sinon,
  appModule,
  app,
  routeStack,
  mockReq,
  mockRes,
  wwwModule,
  packageFile,
  ast,
  jscs,
  match,
  matchObj,
  fs,
  path
});
