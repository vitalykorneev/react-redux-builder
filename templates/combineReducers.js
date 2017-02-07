const reducer = `// {{name}}
import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import {{name}} from './{{name}}';

const rootReducer = combineReducers({
  {{name}},
  routing: routerReducer
});

export default rootReducer;
`;

module.exports = reducer;