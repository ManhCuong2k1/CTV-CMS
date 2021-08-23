<template>
    <div>
        <el-col :span="12">
            <el-form
                ref="distributorForm"
                :model="distributorForm"
                label-width="150px"
                class="w-full"
                :rules="rules"
            >
                <el-form-item label="Tên nhà cung cấp" prop="name">
                    <el-input v-model="distributorForm.name" placeholder="Tên nhà cung cấp" />
                </el-form-item>
                <el-form-item label="Điện thoại" prop="phone">
                    <el-input v-model="distributorForm.phone" placeholder="Điện thoại" />
                </el-form-item>
                <el-form-item label="Email" prop="email">
                    <el-input v-model="distributorForm.email" placeholder="Email" />
                </el-form-item>
                <el-form-item label="Chiết khấu (%)" prop="percentDiscount">
                    <el-input
                        v-model="distributorForm.percentDiscount"
                        placeholder="Chiết khấu"
                        type="number"
                    />
                </el-form-item>
                <el-form-item label="Mã" prop="code">
                    <el-input
                        v-model="distributorForm.code"
                        placeholder="Mã"
                    />
                </el-form-item>
                <el-form-item v-if="!hasPassword" label="Mật khẩu" prop="password">
                    <el-input v-model="distributorForm.password" type="password" placeholder="Mặc định: 123456" />
                </el-form-item>
                <el-form-item v-else label="Mật khẩu" prop="password">
                    <div class="flex">
                        <el-input
                            v-model="distributorForm.password"
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
                    <el-input v-model="distributorForm.address" placeholder="Địa chỉ" />
                </el-form-item>
                <el-form-item label="Tỉnh\Thành phố" prop="CityId">
                    <el-select
                        v-model="distributorForm.CityId"
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
                        v-model="distributorForm.DistrictId"
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
                    <el-button type="primary" @click="submitForm('distributorForm')">
                        Lưu
                    </el-button>
                    <el-button @click="resetForm('distributorForm')">
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
    import { validString, validPhone, validInteger } from '~/utils/form';

    const modelForm = {
        name: '',
        phone: '',
        email: '',
        address: '',
        CityId: '',
        password: '',
        DistrictId: '',
        code: '',
    };

    export default {
        components: {
        },
        props: {
            distributorData: {
                type: Object,
                required: false,
            },
        },
        data() {
            const distributorForm = this.distributorData ? cloneDeep(this.distributorData) : cloneDeep(modelForm);
            const hasPassword = distributorForm.password.length > 0;
            distributorForm.percentDiscount *= 100;
            return {
                loading: false,
                passVisiable: false,
                distributorForm,
                hasPassword,
                rules: {
                    name: [
                        { required: true, message: 'Vui lòng nhập tên', trigger: 'blur' },
                        {
                            min: 1, max: 300, validator: validString, trigger: 'blur',
                        },
                    ],
                    email: [
                        {
                            required: true, type: 'email', message: 'Vui lòng nhập email', trigger: 'blur',
                        },
                    ],
                    CityId: [
                        { required: true, message: 'Vui lòng chọn thành phố ', trigger: 'blur' },
                    ],
                    DistrictId: [
                        { required: true, message: 'Vui lòng chọn quận/huyện', trigger: 'blur' },
                    ],
                    phone: [
                        {
                            required: true,
                            validator: validPhone,
                            message: 'Vui lòng nhập số điện thoại',
                            trigger: 'blur',
                        },
                    ],
                    percentDiscount: [
                        {
                            required: true,
                            validator: validInteger,
                            message: 'Vui lòng nhập tỉ lệ chiết khấu là số nguyên',
                            trigger: 'blur',
                        },
                    ],
                },
            };
        },
        computed: {
            ...mapState('admin/common', ['optionCities']),
            ...mapState('admin/common', ['optionDistricts']),
        },
        async beforeMount() {
            await this.$store.dispatch('admin/common/searchCities');
            if (this.distributorData != null) {
                await this.$store.dispatch('admin/common/searchDistrics', { cityId: this.distributorData.CityId });
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
                        this.$emit('submitForm', this.distributorForm);
                    } else {
                        return false;
                    }
                });
            },
            resetPassword() {
                this.passVisiable = true;
                this.distributorForm.password = '123456';
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
        },
    };
</script>
