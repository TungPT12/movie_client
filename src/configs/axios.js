import axios from 'axios';
const token = '8qlOkxz4wq'
const axiosInstance = axios.create({
    // baseURL: 'http://localhost:5000/api/movies/',
    baseURL: 'https://movie-trailer-u5xs.onrender.com/api/movies',
    headers: { 'Authorization': 'Bearer ' + token }
})

export default axiosInstance;