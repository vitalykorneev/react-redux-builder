const helper = require('../helper');

const templates = {
  component: (name) => {
    helper.createComponent({
      name,
      type: 'components'
    });
  },
  container: (name) => {
    helper.createComponent({
      name,
      type: 'containers'
    });
  },
  action: (name) => {
    helper.createAction(name);
  },
  reducer: (name) => {
    helper.createReducer(name);
  }
};

module.exports = templates;