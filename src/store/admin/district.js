export const state = () => ({
    districts: [],
    districtDetail: [],
    paginationDistrict: [],
});

export const mutations = {
    setDistricts(state, payload) {
        state.districts = payload.data;
        state.paginationDistrict = {
            page: payload.page,
            pageSize: payload.pageSize,
            total: payload.total,
            lastPage: Math.ceil(payload.total / payload.pageSize),
        };
    },
    setDistrictDetail(state, payload) {
        state.districtDetail = payload;
    },
};

export const actions = {
    async fetch({ commit }, params) {
        const res = await this.$axios.get(`/admin/city/${params.cityId}/districts`, { params });
        commit('setDistricts', res.data);
    },
    async show({ commit }, id) {
        const res = await this.$axios.get(`/admin/district/${id}`);
        commit('setDistrictDetail', res.data);
    },
    async update({ commit }, payload) {
        await this.$axios.put(`/admin/district/${payload.id}`, payload.data);
        commit('setDistrictDetail', payload.data);
    },
    async create({ commit }, payload) {
        const res = await this.$axios.post('/admin/district', payload.data);
        commit('setDistrictDetail', res.data);
    },
    async delete({ commit }, payload) {
        const res = await this.$axios.delete(`/admin/district/${payload.id}`);
        commit('setDistrictDetail', res.data);
    },
    async restore({ commit }, payload) {
        const res = await this.$axios.post(`/admin/district/restore/${payload.id}`);
        commit('setDistrictDetail', res.data);
    },
};
