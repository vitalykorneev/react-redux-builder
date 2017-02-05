const actionItem = ` // {{name}}
export function {{name}}() {
  return (dispatch) => {
    dispatch({
      type: actionTypes.{{actionType}}
    })
  }
}
`;

module.exports = actionItem;