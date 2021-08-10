export const state = () => ({
    optionNewsCates: [],
    optionProductCates: [],
    optionCities: [],
    optionDistricts: [],
    optionDistributors: [],
    optionsProductPromotion: [],
    optionsProductGroup: [],
    optionTransporters: [],
    newNotiTask: null,
});

export const mutations = {
    setNewsCates(state, payload) {
        state.optionNewsCates = payload;
    },
    setProductCates(state, payload) {
        state.optionProductCates = payload.data;
    },
    setCities(state, payload) {
        state.optionCities = payload.data;
    },
    setDistricts(state, payload) {
        state.optionDistricts = payload.data;
    },
    setDistributors(state, payload) {
        state.optionDistributors = payload.data;
    },
    setProductPromotion(state, payload) {
        state.optionsProductPromotion = payload.data;
    },
    setProductGroup(state, payload) {
        state.optionsProductGroup = payload.data;
    },
    setTransporters(state, payload) {
        state.optionTransporters = payload.data;
    },
    setNewNotiTask(state, payload) {
        state.newNotiTask = payload.data;
    },
};

export const actions = {
    async searchNewsCates({ commit }, params) {
        const res = await this.$axios.get('/admin/news-categories/', { params });
        commit('setNewsCates', res.data);
    },
    async searchProductCates({ commit }, params) {
        const res = await this.$axios.get('/admin/search/product_category/', { params });
        commit('setProductCates', res.data);
    },
    async searchCities({ commit }, params) {
        const res = await this.$axios.get('/admin/search/cities/', { params });
        commit('setCities', res.data);
    },
    async searchDistrics({ commit }, params) {
        const res = await this.$axios.get('/admin/search/districts/', { params });
        commit('setDistricts', res.data);
    },
    async searchDistributors({ commit }, params) {
        const res = await this.$axios.get('/admin/search/distributors/', { params });
        commit('setDistributors', res.data);
    },
    async searchProductCategory({ commit }, params) {
        const res = await this.$axios.get('/admin/product-category/', { params });
        commit('setProductCates', res.data);
    },
    async searchProductPromotion({ commit }, params) {
        const res = await this.$axios.get('/admin/search/products/', { params });
        commit('setProductPromotion', res.data);
    },
    async searchProductGroup({ commit }, params) {
        const res = await this.$axios.get('/admin/search/products/', { params });
        commit('setProductGroup', res.data);
    },
    async searchTransporters({ commit }, params) {
        const res = await this.$axios.get('/admin/search/transporters/', { params });
        commit('setTransporters', res.data);
    },
    async getNewNotiTask({ commit }) {
        const res = await this.$axios.get('/admin/search/new_noti_task/');
        commit('setNewNotiTask', res.data);
    },
};
