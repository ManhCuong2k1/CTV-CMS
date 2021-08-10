<template>
    <div>
        <el-form
            ref="ruleForm"
            :model="ruleForm"
            status-icon
            :rules="rules"
            label-width="120px"
            class="demo-ruleForm"
        >
            <el-form-item label="Mật khẩu" prop="pass">
                <el-input
                    v-model="ruleForm.pass"
                    type="password"
                    autocomplete="off"
                />
            </el-form-item>
            <el-form-item label="Xác nhận" prop="checkPass">
                <el-input
                    v-model="ruleForm.checkPass"
                    class="mt-4"
                    type="password"
                    autocomplete="off"
                />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">
                    Lưu
                </el-button>
                <el-button @click="resetForm('ruleForm')">
                    Làm mới
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        props: {
            reOpenForm: {
                type: Boolean,
                require: false,
            },
            userId: {
                type: Number,
                require: true,
            },
        },

        data() {
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Xin hãy nhập mật khẩu'));
                } else {
                    // eslint-disable-next-line no-useless-escape
                    const mediumRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
                    if (mediumRegex.test(value)) {
                        this.$refs.ruleForm.validateField('checkPass');
                    } else {
                        callback(new Error('Mật khẩu ít nhất 6 ký tự bao gồm chữ thường, chữ hoa và chữ số'));
                    }
                    callback();
                }
            };
            const rePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Xin hãy nhập lại mật khẩu'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('Mật khẩu xác nhận không trùng khớp'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    pass: '',
                    checkPass: '',
                },
                rules: {
                    pass: [
                        { validator: validatePass, trigger: 'change' },
                    ],
                    checkPass: [
                        { validator: rePass, trigger: 'change' },
                    ],
                },
                formLabelWidth: '120px',
            };
        },

        watch: {
            reOpenForm(newVal, oldVal) {
                if (oldVal === false && newVal === true) {
                    this.resetForm('ruleForm');
                }
            },
        },

        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$emit('finishForm', { pass: this.ruleForm.pass });
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
        },
    };
</script>
