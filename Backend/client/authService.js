import axios from 'axios';

// Function to handle user login
export const login = async (email, password) => {
  try {
    const result = await axios.post('/api/auth/login', { email, password });

    const { token } = result.data;
    localStorage.setItem('token', token);

    console.log('Successfully logged in');
    return result.data;
  } catch (err) {
    console.error('Login error encountered', err);
    throw err;
  }
};
