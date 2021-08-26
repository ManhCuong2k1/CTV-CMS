<template>
    <div>
        <el-col :span="12">
            <el-form
                ref="pointofsaleForm"
                :model="pointofsaleForm"
                label-width="150px"
                class="w-full"
                :rules="rules"
            >
                <el-form-item label="Tên thành viên" prop="name">
                    <el-input v-model="pointofsaleForm.name" placeholder="Tên thành viên" />
                </el-form-item>
                <el-form-item label="Điện thoại" prop="phone">
                    <el-input v-model="pointofsaleForm.phone" placeholder="Điện thoại" />
                </el-form-item>
                <el-form-item label="Email" prop="email">
                    <el-input v-model="pointofsaleForm.email" placeholder="Email" />
                </el-form-item>
                <el-form-item v-if="!hasPassword" label="Mật khẩu" prop="password">
                    <el-input v-model="pointofsaleForm.password" type="password" placeholder="Mặc định: 123456" />
                </el-form-item>
                <el-form-item v-else label="Mật khẩu" prop="password">
                    <div class="flex">
                        <el-input
                            v-model="pointofsaleForm.password"
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
                <el-form-item label="Địa chỉ" prop="address">
                    <el-input v-model="pointofsaleForm.address" placeholder="Địa chỉ" />
                </el-form-item>
                <el-form-item label="Tỉnh\Thành phố" prop="CityId">
                    <el-select
                        v-model="pointofsaleForm.CityId"
                        placeholder="Thành phố"
                        @change="updateSelectCity"
                    >
                        <el-option
                            v-for="item in optionCities"
                            :key="item.slug"
                            :label="item.label"
                            :value="item.slug"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="Quận\Huyện" prop="DistrictId">
                    <el-select
                        v-model="pointofsaleForm.DistrictId"
                        placeholder="Quận huyện"
                    >
                        <el-option
                            v-for="item in optionDistricts"
                            :key="item.slug"
                            :label="item.label"
                            :value="item.slug"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button v-if="pointofsaleForm.status != 'confirm'" type="success" @click="confirmPOS()">
                        Duyệt thành viên
                    </el-button>
                    <el-button v-if="pointofsaleForm.status == 'confirm'" type="danger" @click="disablePOS()">
                        Khóa thành viên
                    </el-button>
                    <el-button type="primary" @click="submitForm('pointofsaleForm')">
                        Lưu
                    </el-button>
                    <el-button @click="resetForm('pointofsaleForm')">
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
        name: '',
        ownerName: '',
        phone: '',
        email: '',
        password: '',
        address: '',
        CityId: '',
        DistrictId: '',
        AdminId: '',
    };

    export default {
        components: {
        },
        props: {
            pointofsaleData: {
                type: Object,
                required: false,
            },
        },
        data() {
            const pointofsaleForm = this.pointofsaleData ? cloneDeep(this.pointofsaleData) : cloneDeep(modelForm);
            const hasPassword = pointofsaleForm.password !== null && pointofsaleForm.password !== '';
            return {
                loading: false,
                passVisiable: false,
                pointofsaleForm,
                hasPassword,
                rules: {
                    name: [
                        { required: true, message: 'Vui lòng nhập tên', trigger: 'blur' },
                        {
                            min: 1, max: 300, validator: validString, trigger: 'blur',
                        },
                    ],
                    ownerName: [
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
                    CityId: [
                        { required: true, message: 'Vui lòng nhập thành phố', trigger: 'blur' },
                    ],
                    DistrictId: [
                        { required: true, message: 'Vui lòng nhập quận/huyện', trigger: 'blur' },
                    ],
                    AdminId: [
                        { required: true, message: 'Vui lòng nhập nhà cung cấp', trigger: 'blur' },
                    ],

                },
            };
        },
        computed: {
            ...mapState('admin/common', ['optionCities', 'optionDistricts', 'optionDistributors']),
            userLoged() {
                return this.$store.state.auth.user;
            },
        },
        async beforeMount() {
            await this.$store.dispatch('admin/common/searchCities');
            if (this.pointofsaleData != null) {
                await this.$store.dispatch('admin/common/searchDistrics', { cityId: this.pointofsaleData.CityId });
            }
        },
        methods: {
            async updateSelectCity(cityId) {
                if (cityId) {
                    await this.$store.dispatch('admin/common/searchDistrics', { cityId });
                }
            },
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        this.$emit('submitForm', this.pointofsaleForm);
                    } else {
                        return false;
                    }
                });
            },
            confirmPOS() {
                this.$confirm('Bạn sẽ duyệt thành viên này ?', 'Cảnh báo', {
                    confirmButtonText: 'Xác nhận',
                    cancelButtonText: 'Bỏ qua',
                    type: 'warning',
                }).then(() => {
                    this.$emit('confirmPOS', this.pointofsaleForm.id);
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
            disablePOS() {
                this.$confirm('Bạn sẽ khóa thành viên này ?', 'Cảnh báo', {
                    confirmButtonText: 'Xác nhận',
                    cancelButtonText: 'Bỏ qua',
                    type: 'warning',
                }).then(() => {
                    this.$emit('disablePOS', this.pointofsaleForm.id);
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
            resetPassword() {
                this.passVisiable = true;
                this.pointofsaleForm.password = '123456';
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            async remoteDistributor(query) {
                this.loading = true;
                await this.$store.dispatch('admin/common/searchDistributors', { query });
                this.loading = false;
            },
        },
    };
</script>
