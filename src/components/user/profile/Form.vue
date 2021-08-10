<template>
    <div>
        <el-form
            ref="userForm"
            :model="userForm"
            label-width="120px"
            class="md:w-2/3"
            :rules="rules"
        >
            <el-form-item class="md:w-2/3" label="Tên đăng nhập" prop="username">
                <el-input v-model="userForm.username" placeholder="Username" disabled />
            </el-form-item>
            <el-form-item class="md:w-2/3" label="Họ" prop="last_name">
                <el-input v-model="userForm.last_name" placeholder="Họ" />
            </el-form-item>
            <el-form-item class="md:w-2/3" label="Tên" prop="first_name">
                <el-input v-model="userForm.first_name" placeholder="Tên đệm & Tên" />
            </el-form-item>
            <el-form-item class="md:w-2/3" label="Email" prop="email">
                <el-input v-model="userForm.email" placeholder="Email" />
            </el-form-item>
            <el-form-item class="md:w-2/3" label="Điện thoại" prop="phone">
                <el-input v-model="userForm.phone" placeholder="Phone" />
            </el-form-item>
            <el-form-item class="md:w-2/3" label="Ngày sinh" prop="birthday">
                <el-date-picker
                    v-model="userForm.birthday"
                    type="date"
                    format="dd-MM-yyyy"
                    placeholder="Pick a date"
                    style="width: 100%;"
                />
            </el-form-item>
            <el-form-item label="Giới tính" prop="gender">
                <div>
                    <el-select v-model="userForm.gender" placeholder="Gender">
                        <el-option label="Nam" value="male" />
                        <el-option label="Nữ" value="female" />
                        <el-option label="Khác" value="other" />
                    </el-select>
                </div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('userForm')">
                    Lưu
                </el-button>
                <el-button @click="resetForm('userForm')">
                    Làm mới
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        props: {
            userData: {
                type: Object,
                required: true,
            },
        },
        data() {
            return {
                userForm: this.userData,
                rules: {
                    last_name: [
                        {
                            min: 3, max: 30, message: 'Length should be 3 to 30', trigger: 'blur',
                        },
                    ],
                    first_name: [
                        { required: true, message: 'Please input name', trigger: 'blur' },
                        {
                            min: 3, max: 30, message: 'Length should be 3 to 30', trigger: 'blur',
                        },
                    ],
                    email: [
                        { required: true, message: 'Please input email', trigger: 'blur' },
                        { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] },
                    ],
                },
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$emit('submitForm', this.userForm);
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
