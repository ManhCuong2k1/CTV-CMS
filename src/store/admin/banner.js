export const state = () => ({
    bannersData: [],
});

export const mutations = {
    setBannersData(state, payload) {
        state.bannersData = payload.data;
    },
};

export const actions = {
    async fetch({ commit }) {
        const res = await this.$axios.get('/admin/banner');
        commit('setBannersData', res.data);
    },

    async update({ commit }, payload) {
        await this.$axios.post('/admin/banner', payload);
        commit('setBannersData', payload.banners);
    },
};
