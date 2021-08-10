export const state = () => ({
    images: [],
});

export const getters = {
    getimages(state) {
        return state.images;
    },
};

export const mutations = {
    setimagesData(state, payload) {
        state.images = payload.data;
    },
};

export const actions = {
    async fetchData({ commit }) {
        const res = await this.$axios.get('/upload/images');
        commit('setimagesData', res.data);
    },
};
