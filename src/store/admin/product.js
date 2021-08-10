import { findIndex } from 'lodash';

export const state = () => ({
    products: [],
    product: null,
    pagination: null,
});

export const getters = {
    getProducts(state) {
        return state.products;
    },
};

export const mutations = {
    setProductsData(state, payload) {
        state.products = payload.data;
        state.pagination = {
            page: payload.page,
            pageSize: payload.pageSize,
            total: payload.total,
            lastPage: Math.ceil(payload.total / payload.pageSize),
        };
    },
    resetProductsData(state) {
        state.products = [];
        state.product = null;
        state.pagination = null;
    },
    setProduct(state, payload) {
        state.product = payload.data;
    },
    setUpdateProduct(state, payload) {
        const index = findIndex(state.products, { id: payload.id });
        state.products.splice(index, 1, { ...index, ...payload });
    },
};

export const actions = {
    async fetch({ commit }, params) {
        const res = await this.$axios.get('/admin/product', { params });
        commit('setProductsData', res.data);
    },

    async reset({ commit }) {
        commit('resetProductsData');
    },

    async show({ commit }, id) {
        const res = await this.$axios.get(`/admin/product/${id}`);
        commit('setProduct', res.data);
    },

    async create({ commit }, payload) {
        await this.$axios.post('/admin/product/create', payload.data);
        commit('setProduct', payload.data);
    },

    async update({ commit }, payload) {
        const res = await this.$axios.put(`/admin/product/update/${payload.id}`, payload.data);
        commit('setUpdateProduct', res.data.data);
    },

    async delete({ commit }, payload) {
        const res = await this.$axios.delete(`/admin/product/${payload.id}`);
        commit('setUpdateProduct', res.data);
    },

    async restore({ commit }, payload) {
        const res = await this.$axios.put(`/admin/product/restore/${payload.id}`);
        commit('setUpdateProduct', res.data);
    },
};
