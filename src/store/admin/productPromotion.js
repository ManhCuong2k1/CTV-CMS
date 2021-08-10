export const state = () => ({
    productPromotion: [],
    pagination: [],
    promotion: null,
});

export const mutations = {
    setPromotionData(state, payload) {
        state.productPromotion = payload.data;
        state.pagination = {
            page: payload.page,
            pageSize: payload.pageSize,
            total: payload.total,
            lastPage: Math.ceil(payload.total / payload.pageSize),
        };
    },
    setPromotion(state, payload) {
        state.promotion = payload;
    },
};

export const actions = {
    async fetch({ commit }, params) {
        const res = await this.$axios.get(`/admin/ref-promotion/${params.promotionId}`, { params });
        commit('setPromotionData', res.data);
    },
    async create({ commit }, payload) {
        await this.$axios.post('/admin/ref-promotion', payload);
        commit('setPromotion', payload.data);
    },
    async delete({ commit }, params) {
        await this.$axios.delete('/admin/ref-promotion', { params });
        commit('setPromotion', params.data);
    },

};
