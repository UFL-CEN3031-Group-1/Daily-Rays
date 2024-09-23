import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'CEN3031_App': import.meta.env.VITE_APP_NAME },
});

export const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'CEN3031_App': import.meta.env.VITE_APP_NAME, 'Content-Type': 'application/json' },
  withCredentials: true,
});


// Success: "data": { ... }, "message": "..."
// Error: "error": { "code": ..., } "message": "..."

export const fetchData = async (endpoint) => {
  try {
    const response = await axiosPrivate.get(endpoint);
    if (response.data) {
      const { data, message } = response.data;
      return { data, message };
    }
    throw new Error(JSON.stringify({ code: 'UNEXPECTED_RESPONSE', message: 'Unexpected response format' }));
  } catch (err) {
    if (err.response && err.response.data && err.response.data.error) {
      throw new Error(JSON.stringify({ code: err.response.data.error.code, message: err.response.data.message }));
    } else {
      throw new Error(JSON.stringify({ code: 'UNKNOWN_ERROR', message: err.message }));
    }
  }
};


export const postData = async (endpoint, data) => {
  try {
    const response = await axiosPrivate.post(endpoint, data);
    if (response.data) {
      const { data, message } = response.data;
      return { data, message };
    }
    throw new Error(JSON.stringify({ code: 'UNEXPECTED_RESPONSE', message: 'Unexpected response format' }));
  } catch (err) {
    if (err.response && err.response.data && err.response.data.error) {
      throw new Error(JSON.stringify({ code: err.response.data.error.code, message: err.response.data.message }));
    } else {
      throw new Error(JSON.stringify({ code: 'UNKNOWN_ERROR', message: err.message }));
    }
  }
};



export default axiosInstance;
