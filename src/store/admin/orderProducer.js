import { findIndex } from 'lodash';

export const state = () => ({
    order: [],
    orderProducers: [],
    orderProducer: null,
    pagination: null,
});

export const mutations = {
    addOrder(state, payload) {
        state.order.push(payload);
    },
    updateOrder(state, payload) {
        state.order[payload.index].amount += payload.data.amount;
    },
    forceUpdateItemOrder(state, payload) {
        state.order[payload.index].amount = payload.data.amount;
    },
    removeFromOrder(state, payload) {
        const index = findIndex(state.order, { id: payload.id });
        state.order.splice(index, 1);
    },
    clearOrder(state) {
        state.order = [];
    },

    setOrders(state, payload) {
        state.orderProducers = payload.data;
        state.pagination = {
            page: payload.page,
            pageSize: payload.pageSize,
            total: payload.total,
            lastPage: Math.ceil(payload.total / payload.pageSize),
        };
    },
    setOrderDetail(state, payload) {
        state.orderProducer = payload.data;
    },
};

export const actions = {
    async addToOrder({ commit, state }, payload) {
        const index = findIndex(state.order, { id: payload.id });
        if (state.order[index]) {
            commit('updateOrder', { data: payload, index });
        } else {
            const res = await this.$axios.get(`/admin/product/${payload.id}`);
            payload.data = res.data.data;
            commit('addOrder', payload);
        }
    },
    forceUpdateItemOrder({ commit, state }, payload) {
        const index = findIndex(state.order, { id: payload.id });
        commit('forceUpdateItemOrder', { data: payload, index });
    },
    removeFromOrder({ commit }, payload) {
        commit('removeFromOrder', payload);
    },
    async sendOrder({ commit, state }) {
        await this.$axios.post('/admin/order-producer', state.order);
        commit('clearOrder');
    },

    async fetch({ commit }, params) {
        const res = await this.$axios.get('/admin/order-producer/history', { params });
        commit('setOrders', res.data);
    },
    async show({ commit }, id) {
        const res = await this.$axios.get(`/admin/order-producer/${id}`);
        commit('setOrderDetail', res.data);
    },
    async update({ commit }, payload) {
        await this.$axios.put(`/admin/order-producer/${payload.id}`, payload.data);
        commit('clearOrder');
    },
};
