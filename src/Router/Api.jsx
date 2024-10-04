import axios from 'axios';
const API_URL = 'http://localhost:6001/api/text_to_image/';

export const apiCall = async (url, method, data = {}, headers = {'Content-Type':"application/json"}) => {
    try {

        // const instance = axios.create({
            
        // })
        const response = await axios({
            url: `${API_URL}${url}`,
            method,
            data,   
            headers,
            withCredentials: true
        });
  
      return response.data; // Return the response data
    } catch (error) {
      console.error('API call error:', error);
      throw error; // Rethrow the error to handle it in the component
    }
  };