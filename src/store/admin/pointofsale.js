import { findIndex } from 'lodash';

export const state = () => ({
    pointofsales: null,
    pointofsaleDetail: null,
    pagination: null,
});

export const mutations = {
    setPointOfSales(state, payload) {
        state.pointofsales = payload.data;
        state.pagination = {
            page: payload.page,
            pageSize: payload.pageSize,
            total: payload.total,
            lastPage: Math.ceil(payload.total / payload.pageSize),
        };
    },
    setPointOfSaleDetail(state, payload) {
        state.pointofsaleDetail = payload;
    },
    setUpdatePointOfSale(state, payload) {
        const newItem = payload;
        const index = findIndex(state.cities, { id: payload.id });
        state.cities.splice(index, 1, { ...index, ...newItem });
    },
};

export const actions = {
    async fetch({ commit }, params) {
        const res = await this.$axios.get('/admin/point-of-sale', { params });
        commit('setPointOfSales', res.data);
    },

    async show({ commit }, id) {
        const res = await this.$axios.get(`/admin/point-of-sale/${id}`);
        commit('setPointOfSaleDetail', res.data);
    },

    async create({ commit }, payload) {
        await this.$axios.post('/admin/point-of-sale/', payload.data);
        commit('setPointOfSaleDetail', payload.data);
    },

    async update({ commit }, payload) {
        await this.$axios.put(`/admin/point-of-sale/${payload.id}`, payload.data);
        commit('setPointOfSaleDetail', payload.data);
    },

    async delete({ commit }, payload) {
        const data = await this.$axios.delete(`/admin/point-of-sale/${payload.id}`);
        commit('setUpdatePointOfSale', data);
    },

    async restore({ commit }, payload) {
        const data = await this.$axios.post(`/admin/point-of-sale/restore/${payload.id}`);
        commit('setUpdatePointOfSale', data);
    },
};
