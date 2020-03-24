let myId = 1;

const NProgressWrapper = {
    pendingRequests: [],

    maxAmount: 0,

    getProgress() {
        return (0.3 + this.maxAmount - this.pendingRequests.length) / this.maxAmount;
    },

    addRequest(request) {
        if (this.pendingRequests.length > 0) {
            this.maxAmount++;
            NProgress.set(this.getProgress());
        } else {
            this.maxAmount = 1;
            NProgress.start();
        }

        this.pendingRequests.push(request);
    },

    removeRequest(request) {
        const requestIndex = this.pendingRequests.findIndex(item => item._myId == request._myId);

        this.pendingRequests.splice(requestIndex, 1);

        if (this.pendingRequests.length > 0) {
            NProgress.set(this.getProgress());
        } else {
            this.maxAmount = 0;
            NProgress.done();
        }
    }
}

const onRequestSuccess = (request) => {
    request._myId = myId++;

    NProgressWrapper.addRequest(request);
    //NProgress.start();

    return request;
};

const onRequestError = null;

const onResponseSuccess = (response) => {
    NProgressWrapper.removeRequest(response.config);
    //NProgress.done();

    return response;
};

const onResponseError = (error) => {
    NProgressWrapper.removeRequest(error.response.config);
    //NProgress.done();

    return error;
};

const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/'
});

api.interceptors.request.use(onRequestSuccess, onRequestError);
api.interceptors.response.use(onResponseSuccess, onResponseError);

const getPosts = async () => {
    const postsRequest = await api.get('/posts');
    let posts = postsRequest.data;

    posts = posts.map(async item => {
        const post = item;

        const userRequest = await api.get(`/users/${post.userId}`);
        const commentsRequest = await api.get(`/posts/${post.id}/comments`);

        post.user = userRequest.data;
        post.comments = commentsRequest.data;

        return post;
    });

    return Promise.all(posts);
}