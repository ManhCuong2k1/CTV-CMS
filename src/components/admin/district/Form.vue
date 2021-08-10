<template>
    <div>
        <el-form
            ref="districtForm"
            :model="districtForm"
            label-width="120px"
            class="w-full"
            :rules="rules"
        >
            <el-form-item label="Tên" prop="name">
                <el-col :span="12">
                    <el-input v-model="districtForm.name" placeholder="Tên" />
                </el-col>
            </el-form-item>
            <el-form-item label="Mã" prop="code">
                <el-col :span="12">
                    <el-input v-model="districtForm.code" placeholder="Nhập mã quận/huyện" />
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
            const districtForm = this.districtData ? cloneDeep(this.districtData) : cloneDeep(modelForm);
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
        watch: {
            districtData() {
                this.districtForm = this.districtData ? cloneDeep(this.districtData) : cloneDeep(modelForm);
            },
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        this.$emit('submitForm', this.districtForm);
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
