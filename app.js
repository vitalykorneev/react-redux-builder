const commander = require('commander');
const templates = require('./templates');

commander
  .version('0.0.1')
  .usage('generate [options] [file name]')
  .option('-s, --structure', 'Create React-Redux structure', templates.structure) // Create folders
  .option('-c, --component [name]', 'Create React component', templates.component)
  .option('-C, --container [name]', 'Create React container', templates.container)
  .option('-a, --action [name]', 'Create Redux action', templates.action)
  .option('-r, --reducer [name]', 'Create Redux reducer', templates.reducer)
  .parse(process.argv);