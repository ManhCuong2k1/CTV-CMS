import { findIndex } from 'lodash';

export const state = () => ({
    transporters: null,
    transporterDetail: null,
    pagination: null,
});

export const mutations = {
    setTransporters(state, payload) {
        state.transporters = payload.data;
        state.pagination = {
            page: payload.page,
            pageSize: payload.pageSize,
            total: payload.total,
            lastPage: Math.ceil(payload.total / payload.pageSize),
        };
    },
    setTransporterDetail(state, payload) {
        state.transporterDetail = payload;
    },
    setUpdateTransporter(state, payload) {
        const newItem = payload;
        const index = findIndex(state.cities, { id: payload.id });
        state.cities.splice(index, 1, { ...index, ...newItem });
    },
};

export const actions = {
    async fetch({ commit }, params) {
        const res = await this.$axios.get('/admin/transporter', { params });
        commit('setTransporters', res.data);
    },

    async show({ commit }, id) {
        const res = await this.$axios.get(`/admin/transporter/${id}`);
        commit('setTransporterDetail', res.data);
    },

    async create({ commit }, payload) {
        await this.$axios.post('/admin/transporter/', payload.data);
        commit('setTransporterDetail', payload.data);
    },

    async update({ commit }, payload) {
        await this.$axios.put(`/admin/transporter/${payload.id}`, payload.data);
        commit('setTransporterDetail', payload.data);
    },

    async delete({ commit }, payload) {
        const data = await this.$axios.delete(`/admin/transporter/${payload.id}`);
        commit('setUpdateTransporter', data);
    },

    async restore({ commit }, payload) {
        const data = await this.$axios.post(`/admin/transporter/restore/${payload.id}`);
        commit('setUpdateTransporter', data);
    },
};
