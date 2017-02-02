const action = `// {{name}}
import * as actionTypes from '../constants/{{name}}Constants'

export function action() {
  return (dispatch) => {
    dispatch({
      type: actionTypes.ACTION_TYPE
    })
  }
}
`;

module.exports = action;