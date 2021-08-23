<template>
    <div>
        <el-form
            ref="productForm"
            :model="productForm"
            label-width="200px"
            class="w-full"
            :rules="rules"
        >
            <el-form-item label="Tên sản phẩm" prop="name">
                <el-col :span="12">
                    <el-input v-model="productForm.name" placeholder="Tên sản phẩm" />
                </el-col>
            </el-form-item>
            <el-form-item label="Hiển thị trang chủ" prop="onHome">
                <el-switch
                    v-model="productForm.onHome"
                    active-color="#13ce66"
                    inactive-color="#dcdfe6"
                    :active-value="1"
                    :inactive-value="0"
                />
            </el-form-item>
            <el-form-item v-if="productForm.onHome" label="Danh sách trang chủ" prop="specHome">
                <el-col :span="24">
                    <el-select
                        v-model="productForm.specHome"
                        filterable
                        placeholder="Vui lòng nhập danh mục"
                    >
                        <el-option
                            :label="'Sản phẩm mới'"
                            :value="'new'"
                        />
                        <el-option
                            :label="'Sản phẩm bán chạy'"
                            :value="'hot'"
                        />
                        <el-option
                            :label="'Sản phẩm giá tốt'"
                            :value="'discount'"
                        />
                    </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="Ảnh đại diện" prop="avatar">
                <el-col :span="12">
                    <el-button @click="openGallery">
                        <span v-if="!productForm.avatar">Chọn ảnh đại diện</span>
                        <div v-else>
                            <img class="w-32" :src="toImage(productForm.avatar, 'avatar')">
                        </div>
                    </el-button>
                </el-col>
            </el-form-item>
            <el-form-item label="Ảnh sản phẩm" size="small" class="content-center">
                <el-button
                    v-for="(image, index) in productForm.images"
                    :key="index"
                    @click="deleteImage(image)"
                >
                    <span v-if="!productForm.images">Chọn ảnh sản phẩm</span>
                    <div v-else>
                        <div><img class="w-32" :src="toImage(image.url, 'avatar')"></div>
                        <span class="pd-0"><i class="el-icon-delete" /></span>
                    </div>
                </el-button>
                <el-button @click="openProductGallery">
                    <span>Chọn ảnh sản phẩm</span>
                </el-button>
            </el-form-item>
            <el-form-item label="Danh mục" prop="ProductCategoryId">
                <el-col :span="24">
                    <el-select
                        v-model="productForm.ProductCategoryId"
                        filterable
                        placeholder="Vui lòng nhập danh mục"
                    >
                        <el-option
                            v-for="item in optionProductCates"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        />
                    </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="Giá" prop="price">
                <el-col :span="12">
                    <Currency v-model="productForm.price" :placeholder="'Giá'" />
                </el-col>
            </el-form-item>
            <el-form-item label="Giá thành viên" prop="promotionPrice">
                <el-col :span="12">
                    <Currency v-model="productForm.promotionPrice" :placeholder="'Giá thành viên'" />
                </el-col>
            </el-form-item>
            <el-form-item label="Đơn vị tính" prop="volumeUnit">
                <el-col :span="12">
                    <el-input v-model="productForm.volumeUnit" placeholder="Đơn vị tính" />
                </el-col>
            </el-form-item>
            <el-form-item label="Số lượng" prop="volume">
                <el-col :span="12">
                    <el-input v-model="productForm.volume" type="number" min="0" />
                </el-col>
            </el-form-item>
            <el-form-item label="Giới hạn">
                <el-col class="flex" :span="12">
                    <el-form-item prop="minPerOrder">
                        <el-input v-model="productForm.minPerOrder" min="0" type="number" />
                    </el-form-item>
                    <span class="mx-3">đến</span>
                    <el-form-item prop="maxPerOrder">
                        <el-input v-model="productForm.maxPerOrder" min="0" type="number" />
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="Mô tả" prop="content">
                <el-col :span="24">
                    <Tinymce
                        :content="productForm.content"
                        @contentChange="contentChange"
                    />
                </el-col>
            </el-form-item>
            <el-form-item v-if="userLoged.type == 'admin'">
                <el-button v-if="productData != null" type="primary" @click="handleSubmit('productForm', productForm)">
                    Lưu
                </el-button>
                <el-button v-else type="primary" @click="handleSubmit('productForm', productForm)">
                    Tạo mới
                </el-button>
            </el-form-item>
        </el-form>
        <el-dialog
            title="Chọn ảnh"
            :visible.sync="dialogGallery"
        >
            <ImageFinder @confirmPick="confirmPick" />
        </el-dialog>
        <el-dialog
            title="Chọn ảnh"
            :visible.sync="dialogProductGallery"
        >
            <ImageFinder @confirmPick="ProductconfirmPick" />
        </el-dialog>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import cloneDeep from 'lodash/cloneDeep';
    import Tinymce from '~/components/editor/Tinymce.vue';
    import { PRODUCT_STATUS } from '~/constants/product';
    import ImageFinder from '~/components/ImageFinder.vue';
    import { image as toImage } from '~/utils/url';
    import { validString, validPositiveNumbers } from '~/utils/form';
    import Currency from '~/components/admin/shared/form/Currency.vue';

    const modelForm = {
        name: '',
        avatar: '',
        ProductCategoryId: '',
        status: 'publish',
        onHome: 0,
        content: '',
        price: 0,
        promotionPrice: 0,
        volumeUnit: '',
        volume: 0,
        images: [],
        attributes: [],
        minPerOrder: null,
        maxPerOrder: null,
    };

    export default {
        components: {
            Tinymce,
            Currency,
            ImageFinder,
        },

        props: {
            productData: {
                type: Object,
                required: false,
            },
        },
        data() {
            const productForm = this.productData ? cloneDeep(this.productData) : cloneDeep(modelForm);
            return {
                dialogGallery: false,
                dialogProductGallery: false,
                loading: false,
                optionStatus: PRODUCT_STATUS,
                productForm,
                rules: {
                    name: [
                        { required: true, message: 'Vui lòng nhập tên', trigger: 'blur' },
                        {
                            min: 1, max: 300, validator: validString, trigger: 'blur',
                        },
                    ],
                    ProductCategoryId: [
                        { required: true, message: 'Vui lòng nhập danh mục sản phẩm', trigger: 'blur' },
                    ],
                    volume: [
                        { required: true, message: 'Vui lòng nhập số lượng sản phẩm', trigger: 'blur' },
                        {
                            validator: validPositiveNumbers, trigger: 'blur',
                        },
                    ],
                    minPerOrder: [
                        {
                            validator: validPositiveNumbers, trigger: 'blur',
                        },
                    ],
                    maxPerOrder: [
                        {
                            validator: validPositiveNumbers, trigger: 'blur',
                        },
                    ],
                    price: [
                        { required: true, message: 'Vui lòng nhập giá sản phẩm', trigger: 'blur' },
                    ],
                    promotionPrice: [
                        { required: true, message: 'Vui lòng nhập giá sản phẩm', trigger: 'blur' },
                    ],
                },
            };
        },
        computed: {
            ...mapState('admin/common', ['optionProductCates']),
            userLoged() {
                return this.$store.state.auth.user;
            },
        },
        watch: {
            productData() {
                this.productForm = this.productData ? cloneDeep(this.productData) : cloneDeep(modelForm);
            },
        },
        async beforeMount() {
            await this.$store.dispatch('admin/common/searchProductCategory');
        },
        methods: {
            toImage,
            openGallery() {
                this.dialogGallery = true;
            },
            openProductGallery() {
                this.dialogProductGallery = true;
            },
            deleteImage(id) {
                const array = this.productForm.images;
                const imageIndex = array.indexOf(id);
                this.productForm.images.splice(imageIndex, 1);
            },
            ProductconfirmPick(name) {
                this.dialogProductGallery = false;
                const imagePick = { url: name, name: name.split('/')[1] };
                if (this.productForm.images === null) {
                    this.productForm.images = [];
                }
                this.productForm.images.push(imagePick);
            },
            confirmPick(name) {
                this.dialogGallery = false;
                this.productForm.avatar = name;
            },
            contentChange(content) {
                this.productForm.content = content;
            },
            handleSubmit(formName, data) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const payload = cloneDeep(data);
                        payload.content = encodeURI(payload.content);
                        this.$emit('finishForm', payload);
                    } else {
                        this.$message.error('Oops, Vui lòng nhập đầy đủ thông tin.');
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
