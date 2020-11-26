const userDataReducer = (state = {}, action) => {
  switch (action.type) {
    case "POST":
        return action.payload;
    case "DELETE":
        return action.payload;
    default:
      return state;
  }
};

export default userDataReducer