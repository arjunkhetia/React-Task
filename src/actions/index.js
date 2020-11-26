import axios from 'axios';

export const post = (data) => {
  return (dispatch) => {
    axios.post('http://localhost:3001/users', data)
      .then((response) => {
        dispatch({
          type: "POST",
          payload: response['data'],
        });
      })
      .catch((error) => {
        dispatch({
          type: "POST",
          payload: error,
        });
      });
  };
};