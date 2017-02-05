const commander = require('commander');
const templates = require('./templates');

commander
  .version('0.0.2')
  .command('generate [name]')
  .alias('g')
  .description('Generate Rreact-Redux components')
  .option('-c, --component', 'Create React component')
  .option('-C, --container', 'Create React container')
  .option('-a, --action [parent]', 'Create Redux action')
  .option('-r, --reducer', 'Create Redux reducer')
  .action(function(name, options){
    if (options.component) {
      templates.component(name);
      return;
    }
    if (options.container) {
      templates.container(name);
      return;
    }
    if (options.action) {
      templates.action(name, options.action);
      return;
    }
    if (options.reducer) {
      templates.reducer(name);
      return;
    }
  });

commander.parse(process.argv);