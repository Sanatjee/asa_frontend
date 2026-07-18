import api from '../api/axios';

const getMetrics = () => {
  return api.get('/dashboard/metrics');
};

export default {
  getMetrics,
};