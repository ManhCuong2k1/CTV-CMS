<template>
    <div>
        <el-form
            ref="groupFrom"
            :model="groupFrom"
            label-width="200px"
            class="w-full"
            :rules="rules"
        >
            <el-form-item label="Tên group" prop="title">
                <el-col :span="12">
                    <el-input v-model="groupFrom.name" placeholder="Tiêu đề" />
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('groupFrom')">
                    Lưu
                </el-button>
                <el-button @click="resetForm('groupFrom')">
                    Làm mới
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import cloneDeep from 'lodash/cloneDeep';
    import { validString } from '~/utils/form';

    const modelForm = {
        name: '',
    };

    export default {

        props: {
            groupData: {
                type: Object,
                required: false,
            },
        },
        data() {
            const groupFrom = this.groupData ? cloneDeep(this.groupData) : cloneDeep(modelForm);
            return {
                dialogVisible: false,
                loading: false,
                groupFrom,
                rules: {
                    name: [
                        { required: true, message: 'Vui lòng nhập tên group sản phẩm', trigger: 'blur' },
                        {
                            min: 1, max: 50, validator: validString, trigger: 'blur',
                        },
                    ],
                },
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        this.$emit('submitForm', this.groupFrom);
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
