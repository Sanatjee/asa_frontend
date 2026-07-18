import api from '../api/axios';

const login = (data) => {
  return api.post(
    '/auth/login',
    data
  );
};

const logout = () => {
  return api.post(
    '/auth/logout'
  );
};

export default {
  login,
  logout,
};