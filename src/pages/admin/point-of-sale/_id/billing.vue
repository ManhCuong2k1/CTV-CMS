<template>
    <div @changePage="updatePage">
        <PageHeader :title="'Lịch sử thanh toán'" />
        <div class="w-full 2xl:w-1/2">
            <div class="mt-5 flex">
                <div class="mr-5">
                    <DateRange
                        :selected-range="[$route.query.fromDate, $route.query.toDate]"
                        @changeDateRange="updateDaterange"
                    />
                </div>
                <el-input
                    v-model="tableFilter.searchKey"
                    placeholder="Tìm kiếm"
                    class="input-with-select mr-5"
                    clearable
                />
                <el-button type="primary" icon="el-icon-search" @click="updateSearchKey">
                    Tìm kiếm
                </el-button>
                <el-button
                    v-if="userLoged.type == 'admin'"
                    class="ml-3"
                    type="success"
                    icon="el-icon-plus"
                    @click="dialogVisible = true"
                >
                    Thêm mới
                </el-button>
            </div>
        </div>
        <div>
            <TableBilling :data="billings" />
        </div>
        <div>
            <Pagination
                :page-size="pagination.pageSize"
                :total="pagination.total"
                :current-page="pagination.page"
                @changePage="updatePage"
            />
        </div>
        <el-dialog
            title="Thêm mới"
            :visible.sync="dialogVisible"
            width="75%"
        >
            <el-form
                ref="billForm"
                :model="billForm"
                label-width="150px"
                class="w-full"
                :rules="rules"
            >
                <el-form-item label="Phương thức" prop="type">
                    <el-select
                        v-model="billForm.type"
                        placeholder="Phương thức"
                    >
                        <el-option
                            :label="'Chuyển khoản'"
                            :value="'bank'"
                        />
                        <el-option
                            :label="'Tiền mặt'"
                            :value="'cash'"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="Số tiền" prop="commissionValue">
                    <Currency v-model="billForm.commissionValue" placeholder="Số tiền" />
                </el-form-item>
                <el-form-item label="Ghi chú" prop="note">
                    <el-col :span="24">
                        <el-input
                            v-model="billForm.note"
                            type="textarea"
                            :autosize="{ minRows: 2, maxRows: 4}"
                        />
                    </el-col>
                </el-form-item>
            </el-form>
            <div class="flex justify-end">
                <el-button @click="dialogVisible = false">
                    Bỏ qua
                </el-button>
                <el-button type="primary" @click="createBill('billForm')">
                    Xác nhận
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import { format } from 'date-fns';
    import cloneDeep from 'lodash/cloneDeep';
    import DateRange from '~/components/admin/shared/form/Datepicker.vue';
    import TableBilling from '~/components/admin/pos-billing/Table.vue';
    import Pagination from '~/components/Pagination.vue';
    import PageHeader from '~/components/admin/shared/PageHeader.vue';
    import { cleanObject } from '~/utils/object';
    import Currency from '~/components/admin/shared/form/Currency.vue';

    const billFormDefault = {
        type: 'bank',
        commissionValue: 0,
        note: '',
    };

    export default {
        layout: 'admin',

        components: {
            PageHeader,
            DateRange,
            TableBilling,
            Pagination,
            Currency,
        },

        watchQuery: true,

        async asyncData({ store, query }) {
            const initFilter = {
                fromDate: null,
                toDate: null,
                city: null,
                district: null,
                searchKey: null,
                deletedAt: null,
                page: query.page || 1,
            };
            const filter = { ...initFilter, ...query };
            const clean = cleanObject(filter);
            await store.dispatch('admin/posBilling/fetchBilling', clean);
            return {
                tableFilter: filter,
            };
        },
        data() {
            return {
                billForm: cloneDeep(billFormDefault),
                dialogVisible: false,
                rules: {
                    type: [
                        { required: true, message: 'Vui lòng nhập loại', trigger: 'blur' },
                    ],
                    commissionValue: [
                        { required: true, message: 'Vui lòng nhập số tiền', trigger: 'blur' },
                    ],
                },
            };
        },
        computed: {
            ...mapState('admin/posBilling', ['billings', 'pagination']),
            userLoged() {
                return this.$store.state.auth.user;
            },
        },
        methods: {
            async fetchData(newFilter) {
                const filter = cleanObject({ ...this.$route.query, ...this.tableFilter, ...newFilter });
                this.$router.push({ query: filter });
            },
            updatePage(page) {
                this.$forceUpdate();
                this.fetchData({ page });
            },
            updateSelectStatus(deletedAt) {
                this.fetchData({ deletedAt, page: null });
            },
            updateDaterange(value) {
                let fromDate = null;
                let toDate = null;
                const page = null;

                if (value !== null) {
                    fromDate = format(new Date(value[0]), 'yyyy-MM-dd');
                    toDate = format(new Date(value[1]), 'yyyy-MM-dd');
                }
                this.fetchData({ fromDate, toDate, page });
            },
            updateSearchKey() {
                const page = null;
                this.fetchData({ page });
            },
            async createBill(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        await this.$store.dispatch('admin/posBilling/create', {
                            type: this.billForm.type,
                            PointOfSaleId: this.$route.params.id,
                            commissionValue: parseInt(this.billForm.commissionValue, 10),
                            note: this.billForm.note,
                        }).catch((result) => {
                            this.$message({
                                type: 'warning',
                                message: result.response.data.error,
                            });
                        }).then(() => {
                            this.billForm = cloneDeep(billFormDefault);
                            this.dialogVisible = false;
                            this.fetchData();
                        });
                    } else {
                        return false;
                    }
                });
            },
        },
    };
</script>

<style lang="sass">
    .el-range-separator
        box-sizing: content-box
    .el-button:focus
        outline: none !important
</style>
