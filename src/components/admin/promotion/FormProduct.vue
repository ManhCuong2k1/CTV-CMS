<template>
    <div>
        <el-form
            label-width="120px"
            class="w-full"
        >
            <el-form-item label="Sản phẩm">
                <el-select
                    v-model="productId"
                    placeholder="Chọn sản phẩm"
                    filterable
                    remote
                    :remote-method="remoteProducts"
                >
                    <el-option
                        v-for="item in optionsProductPromotion"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('productForm')">
                    Lưu
                </el-button>
                <el-button @click="resetForm('productForm')">
                    Làm mới
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        data() {
            return {
                loading: false,
                productId: null,
            };
        },
        computed: {
            ...mapState('admin/common', ['optionsProductPromotion']),
        },
        methods: {
            async remoteProducts(data) {
                await this.$store.dispatch('admin/common/searchProductPromotion', { searchKey: data });
            },
            submitForm() {
                this.$emit('submitForm', this.productId);
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
        },
    };
</script>
