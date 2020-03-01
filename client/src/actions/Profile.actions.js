import axios from 'axios';
import {setAlert} from './Alert.actions';
import {
 GET_PROFILE,
 PROFILE_ERROR,
 //  GET_ERRORS,
 UPDATE_PROFILE,
 CLEAR_PROFILE,
 ACCOUNT_DELETED,
 GET_PROFILES,
 PROFILE_LOADING,
 CLEAR_CURRENT_PROFILE,
 GET_REPOS,
} from './constants';

const config = {
 headers: {
  'Content-Type': 'application/json',
 },
};
// Get currebt users PRofile
export const getCurrentProfile = () => dispatch => {
 axios
  .get('/api/profile/me')
  .then(res =>
   dispatch({
    type: GET_PROFILE, //
    payload: res.data,
   })
  )
  .catch(err => {
   dispatch({
    type: PROFILE_ERROR,
    payload: {
     msg: err.response.statusText,
     status: err.response.status,
    },
   });
  });
};

// Create Profile
export const createProfile = (
 profileData,
 history,
 edit = false
) => dispatch => {
 axios
  .post('/api/profile', profileData)
  .then(res => {
   dispatch({
    type: GET_PROFILE, //
    payload: res.data,
   });
   dispatch(setAlert(edit ? 'Profile updatet' : 'Profile created', 'success'));
   if (!edit) {
    history.push('/dashboard');
   }
  })
  .catch(err => {
   const errors = err.response.data.errors;
   if (errors) {
    errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
   }
   //  dispatch({
   //   type: GET_ERRORS,
   //   payload: err.response.data,
   //  });
   dispatch({
    type: PROFILE_ERROR,
    payload: {
     msg: err.response.statusText, //
     status: err.response.status,
    },
   });
  });
};

//Add EXperince
export const addExperience = (expData, history) => dispatch => {
 axios
  .put('/api/profile/experience', expData, config)
  .then(res => {
   dispatch({
    type: UPDATE_PROFILE, //
    payload: res.data,
   });
   dispatch(setAlert('Experience created', 'success'));
   history.push('/dashboard');
  })
  .catch(err => {
   const errors = err.response.data.errors;
   if (errors) {
    errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
   }
   dispatch({
    type: PROFILE_ERROR,
    payload: {
     msg: err.response.statusText, //
     status: err.response.status,
    },
   });
  });
};

//Add Education
export const addEducation = (expData, history) => dispatch => {
 axios
  .put('/api/profile/education', expData)
  .then(res => {
   dispatch({
    type: UPDATE_PROFILE, //
    payload: res.data,
   });
   dispatch(setAlert('Education created', 'success'));
   history.push('/dashboard');
  })
  .catch(err => {
   const errors = err.response.data.errors;
   if (errors) {
    errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
   }
   dispatch({
    type: PROFILE_ERROR,
    payload: {
     msg: err.response.statusText, //
     status: err.response.status,
    },
   });
  });
};

//Delete education
export const deleteEducation = id => dispatch => {
 axios
  .delete(`/api/profile/education/${id}`)
  .then(res => {
   dispatch({
    type: UPDATE_PROFILE, //
    payload: res.data,
   });
   dispatch(setAlert('Education removed', 'success'));
  })
  .catch(err => {
   dispatch({
    type: PROFILE_ERROR,
    payload: {
     msg: err.response.statusText, //
     status: err.response.status,
    },
   });
  });
};
//Delete experience
export const deleteExperience = id => dispatch => {
 axios
  .delete(`/api/profile/experience/${id}`)
  .then(res => {
   dispatch({
    type: UPDATE_PROFILE, //
    payload: res.data,
   });
   dispatch(setAlert('Experience removed', 'success'));
  })
  .catch(err => {
   dispatch({
    type: PROFILE_ERROR,
    payload: {
     msg: err.response.statusText, //
     status: err.response.status,
    },
   });
  });
};

//Delete account && profile
export const deleteAccount = () => dispatch => {
 if (window.confirm('Are you sure? This can NOT be undone!')) {
  axios
   .delete('/api/profile') //
   .then(res => {
    dispatch({type: CLEAR_PROFILE});
    dispatch({type: ACCOUNT_DELETED});
    dispatch(setAlert('Account  hhas been permanently removed'));
   })
   .catch(err => {
    dispatch({
     type: PROFILE_ERROR,
     payload: {
      msg: err.response.statusText, //
      status: err.response.status,
     },
    });
   });
 }
};

// Get All PRofile
export const getProfiles = () => dispatch => {
 dispatch(setProfileLoading());
 axios
  .get('/api/profile/all')
  .then(res =>
   dispatch({
    type: GET_PROFILES,
    payload: res.data,
   })
  )
  .catch(err =>
   dispatch({
    type: GET_PROFILES,
    payload: null,
   })
  );
};

// Get PRofile by ID
export const getProfileById = userId => dispatch => {
 axios
  .get(`/api/profile/user/:${userId}`)
  .then(res =>
   dispatch({
    type: GET_PROFILES,
    payload: res.data,
   })
  )
  .catch(err =>
   dispatch({
    type: GET_PROFILES,
    payload: null,
   })
  );
};

// Get Github REpos
export const getGithubRepos = username => dispatch => {
 axios
  .get(`/api/profile/github/${username}`)
  .then(res =>
   dispatch({
    type: GET_REPOS,
    payload: res.data,
   })
  )
  .catch(err =>
   dispatch({
    type: GET_PROFILES,
    payload: null,
   })
  );
};

// Profile loading
export const setProfileLoading = () => {
 return {
  type: PROFILE_LOADING,
 };
};

// Clear profile
export const clearCurrentProfile = () => {
 return {
  type: CLEAR_CURRENT_PROFILE,
 };
};
