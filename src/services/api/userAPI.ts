import api from '../axiosConfig';

export const userApi = {
  get: async (username: string) => {
    try {
      const response = await api.request({
        url: `users/${username}`,
        method: 'GET',
      });
      return response;
    } catch (err) {
      console.error(err);
    }
  },
  put: async (username: string, params: { [key: string]: string }) => {
    try {
      const response = await api.put(`users/${username}`, params);
      return response;
    } catch (err) {
      console.error(err);
    }
  },
  delete: async (username: string) => {
    try {
      const response = await api.delete(`users/${username}`);
      return response;
    } catch (err) {
      console.error(err);
    }
  },
};
