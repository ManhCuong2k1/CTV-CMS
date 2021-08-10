export const state = () => ({
    productGroup: [],
    pagination: [],
    group: null,
});

export const mutations = {
    setGroupData(state, payload) {
        state.productGroup = payload.data;
        state.pagination = {
            page: payload.page,
            pageSize: payload.pageSize,
            total: payload.total,
            lastPage: Math.ceil(payload.total / payload.pageSize),
        };
    },
    setGroup(state, payload) {
        state.group = payload;
    },
};

export const actions = {
    async fetch({ commit }, params) {
        const res = await this.$axios.get(`/admin/ref-group/${params.ProductGroupId}`, { params });
        commit('setGroupData', res.data);
    },
    async create({ commit }, payload) {
        await this.$axios.post('/admin/ref-group', payload.data);
        commit('setGroup', payload.data);
    },
    async delete({ commit }, params) {
        await this.$axios.delete('/admin/ref-group', { params });
        commit('setGroup', params.data);
    },

};
