import { findIndex } from 'lodash';

export const state = () => ({
    cities: [],
    cityDetail: [],
    paginationCity: [],
});

export const mutations = {
    setCities(state, payload) {
        state.cities = payload.data;
        state.paginationCity = {
            page: payload.page,
            pageSize: payload.pageSize,
            total: payload.total,
            lastPage: Math.ceil(payload.total / payload.pageSize),
        };
    },
    setCityDetail(state, payload) {
        state.cityDetail = payload;
    },
    setUpdateCity(state, payload) {
        const newItem = payload;
        const index = findIndex(state.cities, { id: payload.id });
        state.cities.splice(index, 1, { ...index, ...newItem });
    },
};

export const actions = {
    async fetch({ commit }, params) {
        const res = await this.$axios.get('/admin/city', { params });
        commit('setCities', res.data);
    },

    async show({ commit }, id) {
        const res = await this.$axios.get(`/admin/city/${id}`);
        commit('setCityDetail', res.data);
    },
    async update({ commit }, payload) {
        await this.$axios.put(`/admin/city/${payload.id}`, payload.data);
        commit('setCityDetail', payload.data);
    },
    async create({ commit }, payload) {
        const res = await this.$axios.post('/admin/city', payload.data);
        commit('setCityDetail', res.data);
    },
    async delete({ commit }, payload) {
        const res = await this.$axios.delete(`/admin/city/${payload.id}`);
        commit('setUpdateCity', res.data);
    },
    async restore({ commit }, payload) {
        const res = await this.$axios.post(`/admin/city/restore/${payload.id}`);
        commit('setUpdateCity', res.data);
    },
};
