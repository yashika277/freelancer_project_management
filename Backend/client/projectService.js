import axios from 'axios';

export const fetchProjects = async () => {
  try {
    const result = await axios.get('/api/projects'); // Token is handled via axiosConfig
    return result.data;
  } catch (err) {
    console.error('Failed to retrieve projects', err);
    throw err;
  }
};
