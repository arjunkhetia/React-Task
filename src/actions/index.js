import axios from 'axios';

export const add = (data) => {
  return (dispatch) => {
    axios.post('http://localhost:5000/users', data)
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

export const update = (id, data) => {
  return (dispatch) => {
    axios.put('http://localhost:5000/users/' + id, data)
      .then((response) => {
        dispatch({
          type: "PUT",
          payload: response['data'],
        });
      })
      .catch((error) => {
        dispatch({
          type: "PUT",
          payload: error,
        });
      });
  };
};

export const delet = (id) => {
  return (dispatch) => {
    axios.delete('http://localhost:5000/users/'+id)
      .then((response) => {
        dispatch({
          type: "DELETE",
          payload: response['data'],
        });
      })
      .catch((error) => {
        dispatch({
          type: "DELETE",
          payload: error,
        });
      });
  };
};