import axiosInstance from '../../configs/axios';


const getMoviesAPI = async (router) => {
    try {
        const response = await axiosInstance.get(router);
        return response;
    } catch (error) {
        return error.response;
    }
}

const getMovieVideoAPI = async (id) => {
    try {
        const response = await axiosInstance.post('/video', { film_id: id });
        return response;
    } catch (error) {
        return error.response;
    }
}

const searchMoviesAPI = async (keyword, page, filterParams) => {
    try {
        const response = await axiosInstance.post('/search', {
            keyword: keyword,
            page: page ? page : 1,
            ...filterParams
        })
        return response;
    } catch (error) {
        return error.response;
    }
}

const getMoviesShowingApi = async () => {
    try {
        const response = await axiosInstance.get('/movies-showing')
        return response;
    } catch (error) {
        return error.response;
    }
}

const getMoviesShowingBydIdApi = async (id) => {
    try {
        const response = await axiosInstance.get(`/movies-showing/${id}`)
        return response;
    } catch (error) {
        return error.response;
    }
}

const createOrder = async (ticket) => {
    try {
        const response = await axiosInstance.post(`/buy-ticket`, ticket)
        return response;
    } catch (error) {
        return error.response;
    }
}


export {
    getMoviesAPI,
    getMovieVideoAPI,
    searchMoviesAPI,
    getMoviesShowingApi,
    getMoviesShowingBydIdApi,
    createOrder
}