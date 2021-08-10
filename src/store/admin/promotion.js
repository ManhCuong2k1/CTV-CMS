export const state = () => ({
    promotions: [],
    promotion: '',
    pagination: [],
    editPromotion: '',
});

export const getters = {
    getPromotions(state) {
        return state.promotions;
    },
};

export const mutations = {
    setPromotionData(state, payload) {
        state.promotions = payload.data;
        state.pagination = {
            page: payload.page,
            pageSize: payload.pageSize,
            total: payload.total,
            lastPage: Math.ceil(payload.total / payload.pageSize),
        };
    },
    setPromotion(state, payload) {
        state.promotion = payload.data;
    },
    showPromotion(state, payload) {
        state.editPromotion = payload;
    },
};

export const actions = {
    async fetch({ commit }, params) {
        const res = await this.$axios.get('/admin/promotion/list', { params });
        commit('setPromotionData', res.data);
    },
    async show({ commit }, id) {
        const res = await this.$axios.get(`/admin/promotion/show/${id}`);
        commit('setPromotion', res.data);
    },
    async showPromotion({ commit }, id) {
        const res = await this.$axios.get(`/admin/promotion/show/${id}`);
        commit('showPromotion', res.data);
    },
    async create({ commit }, payload) {
        await this.$axios.post('/admin/promotion/', payload.data);
        commit('setPromotion', payload.data);
    },
    async update({ commit }, payload) {
        await this.$axios.put(`/admin/promotion/${payload.id}`, payload.data);
        commit('setPromotion', payload.data);
    },
    async delete({ commit }, payload) {
        const data = await this.$axios.delete(`/admin/promotion/${payload.id}`);
        commit('setPromotion', data);
    },
    async restore({ commit }, payload) {
        const data = await this.$axios.post(`/admin/promotion/restore/${payload.id}`);
        commit('setPromotion', data);
    },
};
