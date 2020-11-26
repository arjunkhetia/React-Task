import axios from 'axios';

const userDataReducer = (state = {}, action) => {
  switch (action.type) {
    case "POST":
      axios.post('http://localhost:3001/users', action.payload)
      .then((response) => {
        return response['data'];
      })
      .catch((error) => {
        return error;
      });
    // eslint-disable-next-line no-fallthrough
    default:
      return state;
  }
};

export default userDataReducer