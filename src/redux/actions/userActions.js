import { SET_USER, SET_ERRORS, LOADING_UI, CLEAR_ERRORS, SET_UNAUTHENTICATED, LOADING_USER, DARK_MODE } from '../types';
import axios from 'axios';

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({type: LOADING_UI});
    axios.post('/login', userData)
			.then(res => {  
				setAuthorizationHeader(res.data.token);
        dispatch(getUserData());
        dispatch({type: CLEAR_ERRORS});
				history.push('/');
			})
			.catch( (err) => {
				dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        })
			});
}

export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({type: LOADING_UI});
  axios.post('/signup', newUserData)
			.then(res => {
				setAuthorizationHeader(res.data.token);
        dispatch(getUserData());
        dispatch({type: CLEAR_ERRORS});
				history.push('/');
			})
			.catch( err => {
				dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        })
			});
};
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('FBIToken');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({type: SET_UNAUTHENTICATED})
}
export const changedarkMode = () => (dispatch) => {
  dispatch({type: DARK_MODE})
} 
export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER})
  axios.get('/user')
  .then(res => {
    console.log(res.data);
    dispatch({
      type: SET_USER,
      payload: res.data,
    });
  })
  .catch(err => console.log(err));
};

export const uploadImage = (formData) => (dispatch) => {
  dispatch({ type:LOADING_USER});
  axios.post('/user/image', formData)
    .then(() => {
      console.log('Image uploaded')
      dispatch(getUserData());
    })
    .catch(err => console.log(err));
}

export const editUserDetails = (userDetails) => (dispatch) => {
  axios.post('/user', userDetails)
    .then(() => {
      console.log(`User details updated succesfully`)
      dispatch(getUserData());
    })
    .catch(err => console.log(err));
}

const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem('FBIToken', FBIdToken);
  axios.defaults.headers.common['Authorization'] = FBIdToken;
}