<template>
    <div class="fixed bg-white z-50 shadow-xl rounded-lg mx-auto top-1/4 left w-96 h-96 pt-24">
        <el-form
            ref="districtForm"
            :model="districtForm"
            label-width="120px"
            class="w-full relative"
            :rules="rules"
        >
            <div class="el-icon-close absolute -top-20 right-4 cursor-pointer" @click="close" />
            <el-form-item label="Tên" prop="name">
                <el-col :span="18">
                    <el-input v-model="districtForm.name" placeholder="Tên" />
                </el-col>
            </el-form-item>
            <el-form-item label="Mã" prop="Code">
                <el-col :span="18">
                    <el-input v-model="districtForm.code" placeholder="Nhập mã quận huyện" />
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('districtForm')">
                    Lưu
                </el-button>
                <el-button @click="resetForm('districtForm')">
                    Làm mới
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import cloneDeep from 'lodash/cloneDeep';

    const modelForm = {
        name: '',
        parent_id: '',
        parent: [],
    };

    export default {
        props: {
            districtData: {
                type: Object,
                required: false,
            },
            baseUrl: {
                type: String,
                require: false,
                default: '/admin/search/district',
            },
        },
        data() {
            const districtForm = cloneDeep(modelForm);
            return {
                loading: false,
                districtForm,
                optiondistrict: districtForm.parent === null ? [] : [districtForm.parent],
                rules: {
                    name: [
                        { required: true, message: 'Vui lòng nhập tên', trigger: 'blur' },
                        {
                            min: 1, max: 300, message: 'Nội dung nên từ 10 tới 300 ký tự', trigger: 'blur',
                        },
                    ],
                },
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        try {
                            await this.$store.dispatch('admin/district/create', { data: this.districtForm });
                            this.$store.dispatch('admin/popup/fetchDistrict', false);
                        } catch (error) {
                            this.$message.error(this.$constants.ERROR_MESSAGE.Default);
                            throw error;
                        } finally {
                            this.loading = false;
                        }
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            close() {
                this.$store.dispatch('admin/popup/fetchDistrict', false);
            },
        },
    };
</script>

<style>
    .left {
        left: 40%;
    }
</style>
