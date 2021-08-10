export const state = () => ({
    notify: [],
    notifyForm: '',
    pagination: [],
    editNotifyForm: '',
});

export const getters = {
    getNotify(state) {
        return state.notify;
    },
};

export const mutations = {
    setNotifyData(state, payload) {
        state.notify = payload.data;
        state.pagination = {
            page: payload.page,
            pageSize: payload.pageSize,
            total: payload.total,
            lastPage: Math.ceil(payload.total / payload.pageSize),
        };
    },
    setNotifyForm(state, payload) {
        state.notifyForm = payload;
        state.editNotifyForm = payload;
    },
};

export const actions = {
    async fetch({ commit }, params) {
        const res = await this.$axios.get('/admin/notify/', { params });
        commit('setNotifyData', res.data);
    },
    async show({ commit }, id) {
        const res = await this.$axios.get(`/admin/notify/${id}`);
        commit('setNotifyForm', res.data);
    },
    async create({ commit }, payload) {
        await this.$axios.post('/admin/notify/', payload.data);
        commit('setNotifyForm', payload.data);
    },
    async update({ commit }, payload) {
        await this.$axios.put(`/admin/notify/${payload.id}`, payload.data);
        commit('setNotifyForm', payload.data);
    },
    async delete({ commit }, payload) {
        const data = await this.$axios.delete(`/admin/notify/${payload.id}`);
        commit('setNotifyForm', data);
    },
};
