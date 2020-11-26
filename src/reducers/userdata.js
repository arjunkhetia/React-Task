const userDataReducer = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "INCREMENTBY5":
      return state + action.payload;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
};

export default userDataReducer