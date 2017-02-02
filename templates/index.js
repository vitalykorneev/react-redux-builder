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
  }
};

module.exports = templates;