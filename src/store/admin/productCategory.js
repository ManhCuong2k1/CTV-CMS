export const state = () => ({
    categories: [],
    category: null,
    pagination: null,
});

export const mutations = {
    setCategoriesData(state, payload) {
        state.categories = payload.data;
        state.pagination = {
            page: payload.page,
            pageSize: payload.pageSize,
            total: payload.total,
            lastPage: Math.ceil(payload.total / payload.pageSize),
        };
    },
    setCategory(state, payload) {
        state.category = payload;
    },
};

export const actions = {
    async fetch({ commit }, params) {
        const res = await this.$axios.get('/admin/product-category', { params });
        commit('setCategoriesData', res.data);
    },

    async create({ commit }, payload) {
        const res = await this.$axios.post('/admin/product-category', payload.data);
        commit('setCategory', res.data);
    },

    async show({ commit }, categoryId) {
        const res = await this.$axios.get(`/admin/product-category/${categoryId}`);
        commit('setCategory', res.data);
    },

    async update({ commit }, payload) {
        await this.$axios.put(`/admin/product-category/${payload.id}`, payload.data);
        commit('setCategory', payload.data);
    },

    async delete({ commit }, payload) {
        const data = await this.$axios.delete(`/admin/product-category/${payload.id}`);
        commit('setCategory', data);
    },

    async restore({ commit }, payload) {
        const data = await this.$axios.post(`/admin/product-category/restore/${payload.id}`);
        commit('setCategory', data);
    },
};
