export const state = () => ({
    groups: [],
    group: '',
    pagination: [],
    editGroup: '',
});

export const getters = {
    getGroups(state) {
        return state.groups;
    },
};

export const mutations = {
    setGroupsData(state, payload) {
        state.groups = payload.data;
        state.pagination = {
            page: payload.page,
            pageSize: payload.pageSize,
            total: payload.total,
            lastPage: Math.ceil(payload.total / payload.pageSize),
        };
    },
    setGroup(state, payload) {
        state.group = payload.data;
    },
    showGroup(state, payload) {
        state.editGroup = payload;
    },
};

export const actions = {
    async fetch({ commit }, params) {
        const res = await this.$axios.get('/admin/product-group/', { params });
        commit('setGroupsData', res.data);
    },
    async show({ commit }, id) {
        const res = await this.$axios.get(`/admin/product-group/${id}`);
        commit('setGroup', res.data);
    },
    async showGroup({ commit }, id) {
        const res = await this.$axios.get(`/admin/product-group/${id}`);
        commit('showGroup', res.data);
    },
    async create({ commit }, payload) {
        await this.$axios.post('/admin/product-group/', payload.data);
        commit('setGroup', payload.data);
    },
    async update({ commit }, payload) {
        await this.$axios.put(`/admin/product-group/${payload.id}`, payload.data);
        commit('setGroup', payload.data);
    },
    async delete({ commit }, payload) {
        const data = await this.$axios.delete(`/admin/product-group/${payload.id}`);
        commit('setGroup', data);
    },
    async restore({ commit }, payload) {
        const data = await this.$axios.post(`/admin/product-group/restore/${payload.id}`);
        commit('setGroup', data);
    },
};
