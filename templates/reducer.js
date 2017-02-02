const reducer = ` // {{name}}
import * as actionTypes from '../constants/{{name}}Constants';

const initialState = {
};

export default function {{name}}Reducer(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case actionTypes.ACTION_TYPE: {
      return {
        ...state
      };
    }

    default:
      return state;
  }
}
`;

module.exports = reducer;