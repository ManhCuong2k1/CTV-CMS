<template>
    <div>
        <el-form
            ref="smsForm"
            :model="smsForm"
            label-width="200px"
            class="w-full"
            :rules="rules"
        >
            <el-form-item label="Thời gian gửi" prop="timeSend">
                <el-date-picker
                    v-model="smsForm.timeSend"
                    type="datetime"
                    placeholder="Thời gian gửi tin nhắn"
                />
            </el-form-item>
            <el-form-item label="Nội dung" prop="content" class="w-1/2">
                <el-col :span="12">
                    <el-input v-model="smsForm.content" placeholder="Nội dung tin nhắn" />
                </el-col>
            </el-form-item>
            <el-form-item label="Đối tượng" prop="target" class="w-1/2">
                <el-select v-model="smsForm.target" placeholder="Đối tượng">
                    <el-option
                        :label="'Điểm bán'"
                        :value="'pointofsale'"
                    />
                    <el-option
                        :label="'Nhà phân phối'"
                        :value="'distributor'"
                    />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('smsForm')">
                    Lưu
                </el-button>
                <el-button @click="resetForm('smsForm')">
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
        content: '',
        searchKey: '',
        timeSend: '',
    };

    export default {
        components: {
        },

        props: {
            smsData: {
                type: Object,
                required: false,
            },
        },
        data() {
            const smsForm = this.smsData ? cloneDeep(this.smsData) : cloneDeep(modelForm);
            return {
                dialogVisible: false,
                loading: false,
                smsForm,
                rules: {
                    content: [
                        { required: true, message: 'Vui lòng nhập nội dung tin nhắn', trigger: 'blur' },
                        {
                            min: 1, max: 155, validator: validString, trigger: 'blur',
                        },
                    ],
                    target: [
                        { required: true, message: 'Vui lòng nhập đối tượng', trigger: 'blur' },
                    ],
                    timeSend: [
                        { required: true, message: 'Vui lòng nhập thời gian gửi', trigger: 'blur' },
                    ],
                },
            };
        },
        watch: {
            smsData() {
                this.smsForm = this.smsData ? cloneDeep(this.smsData) : cloneDeep(modelForm);
            },
        },
        methods: {
            contentChange(content) {
                this.smsForm.content = content;
            },
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        this.$emit('submitForm', this.smsForm);
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
