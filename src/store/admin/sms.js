export const state = () => ({
    sms: [],
    smsForm: '',
    pagination: [],
    editSmsForm: '',
});

export const getters = {
    getSms(state) {
        return state.sms;
    },
};

export const mutations = {
    setSmsData(state, payload) {
        state.sms = payload.data;
        state.pagination = {
            page: payload.page,
            pageSize: payload.pageSize,
            total: payload.total,
            lastPage: Math.ceil(payload.total / payload.pageSize),
        };
    },
    setSmsForm(state, payload) {
        state.smsForm = payload;
        state.editSmsForm = payload;
    },
};

export const actions = {
    async fetch({ commit }, params) {
        const res = await this.$axios.get('/admin/sms/', { params });
        commit('setSmsData', res.data);
    },
    async show({ commit }, id) {
        const res = await this.$axios.get(`/admin/sms/${id}`);
        commit('setSmsForm', res.data);
    },
    async create({ commit }, payload) {
        await this.$axios.post('/admin/sms/', payload.data);
        commit('setSmsForm', payload.data);
    },
    async update({ commit }, payload) {
        await this.$axios.put(`/admin/sms/${payload.id}`, payload.data);
        commit('setSmsForm', payload.data);
    },
    async delete({ commit }, payload) {
        const data = await this.$axios.delete(`/admin/sms/${payload.id}`);
        commit('setSmsForm', data);
    },
};
