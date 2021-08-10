<template>
    <div>
        <el-form
            ref="cityForm"
            :model="cityForm"
            label-width="120px"
            class="w-full"
            :rules="rules"
        >
            <el-form-item label="Tên" prop="name">
                <el-input v-model="cityForm.name" placeholder="Tên" />
            </el-form-item>
            <el-form-item label="Mã" prop="code">
                <el-input v-model="cityForm.code" placeholder="Nhập mã thành phố" />
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
        code: '',
    };

    export default {
        props: {
            cityData: {
                type: Object,
                required: false,
            },
        },
        data() {
            const cityForm = this.cityData ? cloneDeep(this.cityData) : cloneDeep(modelForm);
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
                    code: { required: true, message: 'Vui lòng nhập mã thành phố', trigger: 'blur' },
                },
            };
        },
        watch: {
            cityData() {
                this.cityForm = this.cityData ? cloneDeep(this.cityData) : cloneDeep(modelForm);
            },
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        this.$emit('finishForm', this.cityForm);
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
        },
    };
</script>
