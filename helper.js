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
const reducer = require(path.resolve('templates/reducer'));
const constant = require(path.resolve('templates/constant'));
const indexFile = `index.${config.jsExt}`;

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
  }
};

module.exports = helper;