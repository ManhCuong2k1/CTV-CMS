export const state = () => ({
    systemInfos: null,
});

export const mutations = {
    setInfoData(state, payload) {
        state.systemInfos = payload.data;
    },
};

export const actions = {
    async fetch({ commit }, params) {
        const res = await this.$axios.get('/admin/system-info/', { params });
        commit('setInfoData', res.data);
    },
};
