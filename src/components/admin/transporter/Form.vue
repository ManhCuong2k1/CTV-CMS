<template>
    <div>
        <el-col :span="12">
            <el-form
                ref="transporterForm"
                :model="transporterForm"
                label-width="150px"
                class="w-full"
                :rules="rules"
            >
                <el-form-item label="Tên nhân viên" prop="name">
                    <el-input v-model="transporterForm.name" placeholder="Tên nhân viên" />
                </el-form-item>
                <el-form-item label="Điện thoại" prop="phone">
                    <el-input v-model="transporterForm.phone" placeholder="Điện thoại" />
                </el-form-item>
                <el-form-item v-if="!hasPassword" label="Mật khẩu" prop="password">
                    <el-input v-model="transporterForm.password" type="password" placeholder="Mặc định: 123456" />
                </el-form-item>
                <el-form-item v-else label="Mật khẩu" prop="password">
                    <div class="flex">
                        <el-input
                            v-model="transporterForm.password"
                            class="mr-2"
                            type="password"
                            :disabled="!passVisiable"
                            placeholder="Mặc định: 123456"
                        />
                        <el-button :disabled="passVisiable" @click="resetPassword">
                            Đặt lại
                        </el-button>
                    </div>
                </el-form-item>
                <el-form-item label="Email" prop="email">
                    <el-input v-model="transporterForm.email" placeholder="Email" />
                </el-form-item>
                <el-form-item label="Loại xe" prop="vehicleType">
                    <el-input v-model="transporterForm.vehicleType" placeholder="Loại xe" />
                </el-form-item>
                <el-form-item label="Biển số xe" prop="vehicleCode">
                    <el-input v-model="transporterForm.vehicleCode" placeholder="Biển số xe" />
                </el-form-item>
                <el-form-item label="Địa chỉ" prop="address">
                    <el-input v-model="transporterForm.address" placeholder="Địa chỉ" />
                </el-form-item>
                <el-form-item v-if="userLoged.type == 'admin'" label="Nhà phân phối" prop="AdminId">
                    <el-select
                        v-model="transporterForm.AdminId"
                        placeholder="Nhà phân phối"
                        filterable
                        remote
                        :remote-method="remoteDistributor"
                        :loading="loading"
                    >
                        <el-option
                            v-for="item in optionDistributors"
                            :key="item.slug"
                            :label="item.label"
                            :value="item.slug"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('transporterForm')">
                        Lưu
                    </el-button>
                    <el-button @click="resetForm('transporterForm')">
                        Làm mới
                    </el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import cloneDeep from 'lodash/cloneDeep';
    import { validString, validPhone } from '~/utils/form';

    const modelForm = {
        name: null,
        phone: null,
        email: null,
        address: null,
        password: '',
        AdminId: null,
    };

    export default {
        components: {
        },
        props: {
            transporterData: {
                type: Object,
                required: false,
            },
        },
        data() {
            const transporterForm = this.transporterData ? cloneDeep(this.transporterData) : cloneDeep(modelForm);
            const hasPassword = transporterForm.password !== null && transporterForm.password !== '';
            return {
                passVisiable: false,
                loading: false,
                transporterForm,
                hasPassword,
                rules: {
                    name: [
                        { required: true, message: 'Vui lòng nhập tên', trigger: 'blur' },
                        {
                            min: 1, max: 300, validator: validString, trigger: 'blur',
                        },
                    ],
                    phone: [
                        {
                            required: true,
                            validator: validPhone,
                            message: 'Vui lòng nhập số điện thoại',
                            trigger: 'blur',
                        },
                    ],

                },
            };
        },
        computed: {
            ...mapState('admin/common', ['optionDistributors']),
            userLoged() {
                return this.$store.state.auth.user;
            },
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        this.$emit('submitForm', this.transporterForm);
                    } else {
                        return false;
                    }
                });
            },
            confirmPOS() {
                this.$confirm('Bạn sẽ duyệt điểm bán này ?', 'Cảnh báo', {
                    confirmButtonText: 'Xác nhận',
                    cancelButtonText: 'Bỏ qua',
                    type: 'warning',
                }).then(() => {
                    this.$emit('confirmPOS', this.transporterForm.id);
                    this.$message({
                        type: 'success',
                        message: 'Thành công',
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: 'Đã hủy',
                    });
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            resetPassword() {
                this.passVisiable = true;
                this.transporterForm.password = '123456';
            },
            async remoteDistributor(query) {
                this.loading = true;
                await this.$store.dispatch('admin/common/searchDistributors', { query });
                this.loading = false;
            },
        },
    };
</script>
