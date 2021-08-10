<template>
    <div>
        <div
            class="w-68"
        >
            <div>
                <img class="w-64 mb-5 m-auto" :src="toImage(productView.avatar, 'full')">
            </div>
            <div>
                <span class="font-bold text-black text-lg mb-2">{{ productView.name }}</span>
            </div>
            <div>
                <span class="text-gray-400">{{ productView.volumeUnit }}</span>
            </div>
            <div>
                <div v-if="productView.promotionPrice > 0">
                    <span class="font-bold text-lg  text-red-500">{{ productView.promotionPrice | formatNumber }}đ</span>
                    <span class="font-bold text-gray-300 line-through">{{ productView.price | formatNumber }}đ</span>
                </div>
            </div>
            <div class="mt-3 text-center">
                <el-input-number v-model="amount" :min="1" class="mb-2" />
                <el-button
                    v-if="productData != null"
                    type="primary"
                    @click="handleSubmit"
                >
                    Thêm vào đơn
                </el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import cloneDeep from 'lodash/cloneDeep';
    import { PRODUCT_STATUS } from '~/constants/product';
    import { image as toImage } from '~/utils/url';

    export default {
        components: {
        },

        props: {
            productData: {
                type: Object,
                required: false,
            },
        },
        data() {
            const productView = cloneDeep(this.productData);
            productView.price = this.productData.price || 0;
            productView.promotionPrice = this.productData.promotionPrice || 0;
            return {
                dialogVisible: false,
                loading: false,
                optionStatus: PRODUCT_STATUS,
                productView,
                amount: 1,
            };
        },
        watch: {
            productData() {
                this.productView = cloneDeep(this.productData);
                this.productView.price = this.productData.price || 0;
                this.productView.promotionPrice = this.productData.promotionPrice || 0;
            },
        },
        methods: {
            toImage,
            openGallery() {
                this.dialogVisible = true;
            },
            confirmPick(name) {
                this.dialogVisible = false;
                this.productView.avatar = name;
            },
            contentChange(content) {
                this.productView.content = content;
            },
            handleSubmit() {
                this.$emit('finishForm', { id: this.productView.id, amount: this.amount });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
        },
    };
</script>
