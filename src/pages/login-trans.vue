<template>
    <div class="flex justify-center h-screen bg-gray-100">
        <el-card shadow="always" class="flex align-middle m-auto p-3 md:w-1/4 sm:w-full">
            <div class="font-bold text-center text-xl mb-5">
                Vận chuyển
            </div>
            <div class="mb-5">
                <el-alert
                    v-if="errorLogin"
                    title="Sai thông tin đăng nhập"
                    type="error"
                />
            </div>
            <div class="mb-2">
                <el-input v-model="email" placeholder="Số điện thoại" @keyup.enter.native="loginAction" />
            </div>
            <div class="mb-2">
                <el-input
                    v-model="password"
                    placeholder="Mật khẩu"
                    show-password
                    @keyup.enter.native="loginAction"
                />
            </div>
            <div class="w-full">
                <el-button class="w-full" type="success" @click="loginAction">
                    Đăng nhập
                </el-button>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                email: '',
                password: '',
                errorLogin: false,
            };
        },
        methods: {
            async loginAction() {
                try {
                    await this.$auth.loginWith('local', {
                        data: {
                            transporterEmail: this.email,
                            password: this.password,
                        },
                    });
                    this.$router.push('/admin');
                    this.$message({
                        message: 'Đăng nhập thành công!',
                        type: 'success',
                    });
                } catch (e) {
                    this.errorLogin = true;
                    setTimeout(() => {
                        this.errorLogin = false;
                    }, 5000);
                }
            },
            regGoogle() {
                window.location.href = `${process.env.APP_URL}/api/auth/login/google`;
            },
        },
    };
</script>

<style lang="sass">
    .el-card__body
        width: 100%
</style>
