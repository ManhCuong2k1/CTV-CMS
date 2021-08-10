import { findIndex } from 'lodash';

export const state = () => ({
    orders: null,
    orderDetail: null,
    pagination: null,
});

export const mutations = {
    setOrders(state, payload) {
        state.orders = payload.data;
        state.pagination = {
            page: payload.page,
            pageSize: payload.pageSize,
            total: payload.total,
            lastPage: Math.ceil(payload.total / payload.pageSize),
        };
    },
    setOrderDetail(state, payload) {
        state.orderDetail = payload.data;
    },
    setUpdateOrder(state, payload) {
        const newItem = payload;
        const index = findIndex(state.orders, { id: payload.id });
        state.orders.splice(index, 1, { ...index, ...newItem });
    },
};

export const actions = {
    async fetch({ commit }, params) {
        const res = await this.$axios.get('/admin/order/history', { params });
        commit('setOrders', res.data);
    },

    async show({ commit }, id) {
        const res = await this.$axios.get(`/admin/order/${id}`);
        commit('setOrderDetail', res.data);
    },

    async create({ commit }, payload) {
        await this.$axios.post('/admin/order/', payload.data);
        commit('setOrderDetail', payload);
    },

    async update({ commit }, payload) {
        const res = await this.$axios.put(`/admin/order/${payload.id}`, payload.data);
        commit('setOrderDetail', res.data);
    },

    async delete({ commit }, payload) {
        const data = await this.$axios.put(`/admin/order/deleted/${payload.id}`, { note: payload.value });
        commit('setUpdateOrder', data.data);
    },

    async restore({ commit }, payload) {
        const data = await this.$axios.post(`/admin/order/restore/${payload.id}`);
        commit('setUpdateOrder', data.data);
    },
};
