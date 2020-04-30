const onRequestSuccess = (request) => {
    NProgress.start();

    return request;
};

const onRequestError = null;

const onResponseSuccess = (response) => {
    NProgress.done();

    return response;
};

const onResponseError = (error) => {
    NProgress.done();

    return error;
};

const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/'
});

api.interceptors.request.use(onRequestSuccess, onRequestError);
api.interceptors.response.use(onResponseSuccess, onResponseError);

const getPosts = async () => {
    const { data: posts } = await api.get('/posts');

    return posts;
}