const commander = require('commander');
const templates = require('./templates');

commander
  .version('0.0.1')
  .usage('generate [options] [file name]')
  .option('-c, --component [name]', 'Create React component', templates.component)
  .option('-C, --container [name]', 'Create React container', templates.container)
  .parse(process.argv);