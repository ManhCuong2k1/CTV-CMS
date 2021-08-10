<template>
    <div class="fixed bg-white z-50 shadow-xl rounded-lg mx-auto top-1/4 left w-96 h-96 pt-24">
        <el-form
            ref="cityForm"
            :model="cityForm"
            label-width="120px"
            class="w-full relative"
            :rules="rules"
        >
            <div class="el-icon-close absolute -top-20 right-4 cursor-pointer" @click="close" />
            <el-form-item label="Tên" prop="name">
                <el-col :span="18">
                    <el-input v-model="cityForm.name" placeholder="Tên" />
                </el-col>
            </el-form-item>
            <el-form-item label="Mã" prop="Code">
                <el-col :span="18">
                    <el-input v-model="cityForm.code" placeholder="Nhập mã thành phố" />
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('cityForm')">
                    Lưu
                </el-button>
                <el-button @click="resetForm('cityForm')">
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
            cityData: {
                type: Object,
                required: false,
            },
            baseUrl: {
                type: String,
                require: false,
                default: '/admin/search/city',
            },
        },
        data() {
            const cityForm = cloneDeep(modelForm);
            return {
                loading: false,
                cityForm,
                optioncity: cityForm.parent === null ? [] : [cityForm.parent],
                rules: {
                    name: [
                        { required: true, message: 'Vui lòng nhập tên thành phố', trigger: 'blur' },
                        {
                            min: 1, max: 300, message: 'Độ dài chuỗi từ 10 tới 300', trigger: 'blur',
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
                            this.$store.dispatch('admin/popup/fetch', false);
                            try {
                                await this.$store.dispatch('admin/city/create', { data: this.cityForm });
                            } catch (e) {
                                this.$message({
                                    type: 'error',
                                    message: 'Thành phố đã tồn tại!',
                                });
                            }
                            this.$router.push('/admin/city');
                            this.$message({
                                type: 'success',
                                message: 'Thêm thành công!',
                            });
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
                this.$store.dispatch('admin/popup/fetch', false);
            },
        },
    };
</script>

<style>
    .left {
        left: 40%;
    }
</style>
