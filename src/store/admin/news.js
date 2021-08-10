export const state = () => ({
    news: [],
    new: '',
    pagination: [],
    editnew: '',
});

export const getters = {
    getnews(state) {
        return state.news;
    },
};

export const mutations = {
    setNewsData(state, payload) {
        state.news = payload.data;
        state.pagination = {
            page: payload.page,
            pageSize: payload.pageSize,
            total: payload.total,
            lastPage: Math.ceil(payload.total / payload.pageSize),
        };
    },
    setNews(state, payload) {
        state.new = payload.data;
    },
    showNews(state, payload) {
        state.editnew = payload;
    },
};

export const actions = {
    async fetch({ commit }, params) {
        const res = await this.$axios.get('/admin/news/', { params });
        commit('setNewsData', res.data);
    },
    async show({ commit }, id) {
        const res = await this.$axios.get(`/admin/news/${id}`);
        commit('setNews', res.data);
    },
    async shownews({ commit }, id) {
        const res = await this.$axios.get(`/admin/news/${id}`);
        commit('showNews', res.data);
    },
    async create({ commit }, payload) {
        await this.$axios.post('/admin/news/', payload.data);
        commit('setNews', payload.data);
    },
    async update({ commit }, payload) {
        await this.$axios.put(`/admin/news/${payload.id}`, payload.data);
        commit('setNews', payload.data);
    },
    async delete({ commit }, payload) {
        const data = await this.$axios.delete(`/admin/news/${payload.id}`);
        commit('setNews', data);
    },
    async restore({ commit }, payload) {
        const data = await this.$axios.post(`/admin/news/restore/${payload.id}`);
        commit('setNews', data);
    },
};
