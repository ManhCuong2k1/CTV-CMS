import { findIndex } from 'lodash';

export const state = () => ({
    billings: null,
    billingDetail: null,
    pagination: null,
});

export const mutations = {
    setBillings(state, payload) {
        state.billings = payload.data;
        state.pagination = {
            page: payload.page,
            pageSize: payload.pageSize,
            total: payload.total,
            lastPage: Math.ceil(payload.total / payload.pageSize),
        };
    },
    setBillingDetail(state, payload) {
        state.billingDetail = payload;
    },
    setUpdateBilling(state, payload) {
        const newItem = payload;
        const index = findIndex(state.cities, { id: payload.id });
        state.cities.splice(index, 1, { ...index, ...newItem });
    },
};

export const actions = {
    async fetchBilling({ commit }, params) {
        const res = await this.$axios.get('/admin/pos-billing/history', { params });
        commit('setBillings', res.data);
    },

    async show({ commit }, id) {
        const res = await this.$axios.get(`/admin/pos-billing/${id}`);
        commit('setBillingDetail', res.data);
    },

    async create({ commit }, payload) {
        await this.$axios.post('/admin/pos-billing/create', payload);
        commit('setBillingDetail', payload);
    },

    async update({ commit }, payload) {
        await this.$axios.put(`/admin/pos-billing/${payload.id}`, payload.data);
        commit('setBillingDetail', payload.data);
    },

    async delete({ commit }, payload) {
        const data = await this.$axios.delete(`/admin/pos-billing/${payload.id}`);
        commit('setUpdateBilling', data);
    },

    async restore({ commit }, payload) {
        const data = await this.$axios.post(`/admin/pos-billing/restore/${payload.id}`);
        commit('setUpdateBilling', data);
    },
};
