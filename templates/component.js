const component = `// {{name}}
import React, { Component, PropTypes as Type } from 'react';
import './{{name}}.{{styleExt}}';

import bemCn from 'bem-cn-fast';
const b = bemCn('{{className}}');

export default class {{name}} extends Component {

  static propTypes = {
  }

  render() {
    return (
      <div className={b()}></div>
    );
  };
}
`;

module.exports = component;