import { findIndex } from 'lodash';

export const state = () => ({
    distributors: null,
    distributorDetail: null,
    pagination: null,
});

export const mutations = {
    setDistributors(state, payload) {
        state.distributors = payload.data;
        state.pagination = {
            page: payload.page,
            pageSize: payload.pageSize,
            total: payload.total,
            lastPage: Math.ceil(payload.total / payload.pageSize),
        };
    },
    setDistributorDetail(state, payload) {
        state.distributorDetail = payload;
    },
    setUpdateDistributor(state, payload) {
        const newItem = payload;
        const index = findIndex(state.distributors, { id: payload.id });
        state.distributors.splice(index, 1, { ...index, ...newItem });
    },
};

export const actions = {
    async fetch({ commit }, params) {
        const res = await this.$axios.get('/admin/distributor', { params });
        commit('setDistributors', res.data);
    },

    async show({ commit }, id) {
        const res = await this.$axios.get(`/admin/distributor/${id}`);
        commit('setDistributorDetail', res.data);
    },

    async create({ commit }, payload) {
        await this.$axios.post('/admin/distributor/', payload.data);
        commit('setDistributorCreate', payload.data);
    },

    async update({ commit }, payload) {
        await this.$axios.put(`/admin/distributor/${payload.id}`, payload.data);
        commit('setDistributorDetail', payload.data);
    },

    async delete({ commit }, payload) {
        const res = await this.$axios.delete(`/admin/distributor/${payload.id}`);
        commit('setUpdateDistributor', res.data);
    },

    async restore({ commit }, payload) {
        const res = await this.$axios.post(`/admin/distributor/restore/${payload.id}`);
        commit('setUpdateDistributor', res.data);
    },
};
