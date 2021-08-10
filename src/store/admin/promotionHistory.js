export const state = () => ({
    histories: [],
    pagination: null,
});

export const mutations = {
    setHistoryData(state, payload) {
        state.histories = payload.data;
        state.pagination = {
            page: payload.page,
            pageSize: payload.pageSize,
            total: payload.total,
            lastPage: Math.ceil(payload.total / payload.pageSize),
        };
    },
};

export const actions = {
    async fetch({ commit }, params) {
        const res = await this.$axios.get('/admin/promotion/history', { params });
        commit('setHistoryData', res.data);
    },
};
