const config = require('./config');
const output = config.output;
const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const component = require(path.resolve('templates/component'));
const indexComponent = require(path.resolve('templates/indexComponent'));
const indexCollection = require(path.resolve('templates/indexCollection'));
const indexActionsCollectionTemplate = require(path.resolve('templates/indexActionsCollectionTemplate'));
const action = require(path.resolve('templates/action'));
const actionItem = require(path.resolve('templates/actionItem'));
const reducer = require(path.resolve('templates/reducer'));
const reducerItem = require(path.resolve('templates/reducerItem'));
const constant = require(path.resolve('templates/constant'));
const constantItem = require(path.resolve('templates/constantItem'));
const indexFile = `index.${config.jsExt}`;
const stringSearcher = require('string-search');

const helper = {
  createComponent: (opts) => {
    const { name, type } = opts;
    const dirPath = path.resolve([output.path, output[type]].join('/'));
    const componentPath = [dirPath, name].join('/');

    fs.stat(dirPath, (err, stats) => {

      if (err) {
        console.log('\x1b[31m',`Error: No such file or directory ${dirPath}.`);
        return
      }

      fs.stat(componentPath, (err, stats) => {
        if (!err) {
          console.log('\x1b[31m',`Error: Directory ${componentPath} already exist.`);
        }

        if (err) {
          fs.mkdir(componentPath, (err, stats) => {

            const template = Handlebars.compile(component)({
              name, 
              className: name.toLowerCase(),
              styleExt: config.styleExt
            });

            const indexTemplate = Handlebars.compile(indexComponent)({
              name
            });

            const indexCollectionTemplate = Handlebars.compile(indexCollection)({
              name
            });

            const styleFile = `${name}.${config.styleExt}`;

            fs.writeFile([componentPath, `${name}.${config.jsExt}`].join('/'), template, err => {
              if (err) throw err;

              console.log('\x1b[32m',`Component <${name}> created successful.`);
            });

            fs.writeFile([componentPath, indexFile].join('/'), indexTemplate, err => {
              if (err) throw err;
            });

            fs.writeFile([componentPath, styleFile].join('/'), '', err => {
              if (err) throw err;
            });

            fs.appendFile([dirPath, indexFile].join('/'), indexCollectionTemplate, function (err) {
              if (err) throw err;
            });

          });
        }
      })
    })

  },
  createAction: (name) => {
    const dirPath = path.resolve([output.path, output['actions']].join('/'));
    const actionPath = [dirPath, `${name}Action.${config.jsExt}`].join('/');

    fs.stat(dirPath, (err, stats) => {
      if (err) {
        console.log('\x1b[31m',`Error: No such file or directory ${dirPath}.`);
        return
      }

      fs.stat(actionPath, (err, stats) => {
        if (!err) {
          console.log('\x1b[31m',`Error: File ${actionPath} already exist.`);
          return
        }

        const template = Handlebars.compile(action)({ name });
        const indexCollectionTemplate = Handlebars.compile(indexActionsCollectionTemplate)({ name });

        fs.writeFile(actionPath, template, err => {
          if (err) throw err;

          fs.appendFile([dirPath, indexFile].join('/'), indexCollectionTemplate, function (err) {
            if (err) throw err;
            helper.createConstant(name);
            console.log('\x1b[32m',`Action <${name}> created successful.`);
          });
        })
      })
    })
  },
  createConstant: (name) => {
    const dirPath = path.resolve([output.path, output['constants']].join('/'));
    const actionPath = [dirPath, `${name}Constants.${config.jsExt}`].join('/');

    fs.stat(dirPath, (err, stats) => {
      if (err) {
        console.log('\x1b[31m',`Error: No such file or directory ${dirPath}.`);
        return
      }

      fs.stat(actionPath, (err, stats) => {
        if (!err) {
          console.log('\x1b[31m',`Error: File ${actionPath} already exist.`);
          return
        }

        const template = Handlebars.compile(constant)({ name: name.toUpperCase() });

        fs.writeFile(actionPath, template, err => {
          if (err) throw err;
          console.log('\x1b[32m',`Constant <${name}> created successful.`);
        })
      })
    })
  },
  createReducer: (name) => {
    const dirPath = path.resolve([output.path, output['reducers']].join('/'));
    const actionPath = [dirPath, `${name}Reducer.${config.jsExt}`].join('/');

    fs.stat(dirPath, (err, stats) => {
      if (err) {
        console.log('\x1b[31m',`Error: No such file or directory ${dirPath}.`);
        return
      }

      fs.stat(actionPath, (err, stats) => {
        if (!err) {
          console.log('\x1b[31m',`Error: File ${actionPath} already exist.`);
          return
        }

        const template = Handlebars.compile(reducer)({ name });
        // const indexCollectionTemplate = Handlebars.compile(indexRedusersCollectionTemplate)({ name });

        fs.writeFile(actionPath, template, err => {
          if (err) throw err;
          console.log('\x1b[32m',`Reducer <${name}> created successful.`);
          helper.createAction(name);

          // fs.appendFile([dirPath, indexFile].join('/'), indexCollectionTemplate, function (err) {
          //   if (err) throw err;
          //   helper.createConstant(name);
          //   console.log('\x1b[32m',`Reducer <${name}> created successful.`);
          // });
        })
      })
    })
  },
  createActionReducer: (name, parent) => {
    const dirPath = path.resolve([output.path, output['reducers']].join('/'));
    const actionDirPath = path.resolve([output.path, output['actions']].join('/'));
    const constantsDirPath = path.resolve([output.path, output['constants']].join('/'));
    const reduserPath = [dirPath, `${parent}Reducer.js`].join('/');
    const actionPath = [actionDirPath, `${parent}Action.js`].join('/');
    const constantPath = [constantsDirPath, `${parent}Constants.${config.jsExt}`].join('/');

    let actionType = name.replace(/([A-Z])/g, '_$1');
    actionType = actionType.toUpperCase();

    const constantTemplate = Handlebars.compile(constantItem)({ actionType });
    const actionTemplate = Handlebars.compile(actionItem)({ name, actionType });

    fs.appendFile(constantPath, constantTemplate, function (err) {
      if (err) throw err;
      console.log('\x1b[32m',`Constant <${name.toUpperCase()}> created successful.`);
    });
    fs.appendFile(actionPath, actionTemplate, function (err) {
      if (err) throw err;
      console.log('\x1b[32m',`Action <${name}> created successful.`);
    });

    fs.readFile(reduserPath, 'utf8', function(err, data){
      if (err) {
        return console.log(err);
      }
      stringSearcher.find(data, 'default:')
      .then(function(resultArr) {
        if (!resultArr.length) return;
        var lineNumber = resultArr[0].line - 1
        // var data = fs.readFileSync('file.txt').toString().split("\n");
        const template = Handlebars.compile(reducerItem)({ actionType });
        data = data.toString().split("\n");
        data.splice(lineNumber, 0, template);
        var text = data.join("\n");

        fs.writeFile(reduserPath, text, function (err) {
          if (err) return console.log(err);
        });
      });
    })
  }
};

module.exports = helper;