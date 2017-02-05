const reducerItem = ` // {{name}}
    case actionTypes.{{name}}: {
      return {
        ...state
      }
    }
`
module.exports = reducerItem;
