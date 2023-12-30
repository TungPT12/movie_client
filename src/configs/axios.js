import axios from 'axios';
const token = '8qlOkxz4wq'
const axiosInstance = axios.create({
    // baseURL: 'http://localhost:5000/api/movies/',
    baseURL: 'https://movie-website-q7f0.onrender.com/api/movies/',
    headers: { 'Authorization': 'Bearer ' + token }
})

export default axiosInstance;