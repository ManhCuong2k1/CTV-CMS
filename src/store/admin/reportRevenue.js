export const state = () => ({
    times: [],
    pagination: null,
});

export const mutations = {
    setReportsData(state, payload) {
        state.times = payload.data;
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
        const res = await this.$axios.get('/admin/report/revenue', { params });
        commit('setReportsData', res.data);
    },
};
