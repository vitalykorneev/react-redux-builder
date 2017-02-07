const reducerItem = ` // {{actionType}}
    case actionTypes.{{actionType}}: {
      return {
        ...state
      }
    }
`
module.exports = reducerItem;
