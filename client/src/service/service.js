import axios from 'axios';

export const RegisterUser = user => {
 const config = {
  headers: {
   'Content-Type': 'application/json',
  },
 };
 const body = JSON.stringify(user);
 axios
  .post('/api/users', body, config)
  .then(res => console.log(res.data))
  .catch(err => console.log(err));
};
