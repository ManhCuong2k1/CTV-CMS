export const state = () => ({
    users: [],
    user: null,
    pagination: null,
});

export const getters = {
    getUsers(state) {
        return state.users;
    },
};

export const mutations = {
    setUsersData(state, payload) {
        state.users = payload.data;
        state.pagination = payload.meta;
    },
    setUser(state, payload) {
        state.user = payload.data;
    },
};

export const actions = {
    async fetch({ commit }, params) {
        const res = await this.$axios.get('/admin/user', { params });
        commit('setUsersData', res.data);
    },

    async show({ commit }, username) {
        const res = await this.$axios.get(`/admin/user/${username}`);
        commit('setUser', res.data);
    },

    async update({ commit }, payload) {
        await this.$axios.put(`/admin/user/${payload.id}`, payload.data);
        commit('setUser', payload.data);
    },

    async lock({ commit }, payload) {
        const data = await this.$axios.delete(`/admin/user/${payload.id}`);
        commit('setUser', data);
    },

    async unLock({ commit }, payload) {
        const data = await this.$axios.put(`/admin/user/restore/${payload.id}`);
        commit('setUser', data);
    },
};
