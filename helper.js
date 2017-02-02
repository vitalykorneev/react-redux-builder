const config = require('./config');
const output = config.output;
const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const component = require(path.resolve('templates/component'));
const indexComponent = require(path.resolve('templates/indexComponent'));
const indexCollection = require(path.resolve('templates/indexCollection'));
const indexFile = `index.${config.jsExt}`;

const helper = {
  createComponent: (opts) => {
    const { name, type } = opts;
    const dirPath = path.resolve([output.path, output[type]].join('/'));
    const componentPath = [dirPath, name].join('/');

    fs.stat(dirPath, (err, stats) => {

      if (err) throw new Error(err);

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

              console.log('\x1b[32m',`Component ${name} created successful.`);
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

  }
};

module.exports = helper;