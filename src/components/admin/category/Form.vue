<template>
    <div>
        <el-form
            ref="categoryForm"
            :model="categoryForm"
            label-width="120px"
            class="w-full"
            :rules="rules"
        >
            <el-form-item label="Tên danh mục" prop="name">
                <el-col :span="12">
                    <el-input v-model="categoryForm.name" placeholder="Tiêu đề" />
                </el-col>
            </el-form-item>
            <el-form-item label="Hình ảnh" prop="avatar">
                <el-col :span="12">
                    <el-button @click="openGallery">
                        <span v-if="!categoryForm.avatar">Bộ sưu tập</span>
                        <div v-else>
                            <img class="w-32" :src="toImage(categoryForm.avatar, 'thumbnail')">
                        </div>
                    </el-button>
                    <el-dialog
                        title="Thư viện"
                        :visible.sync="dialogVisible"
                        width="75%"
                    >
                        <ImageFinder @confirmPick="confirmPick" />
                    </el-dialog>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('categoryForm')">
                    Lưu
                </el-button>
                <el-button @click="resetForm('categoryForm')">
                    Làm mới
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import cloneDeep from 'lodash/cloneDeep';
    import ImageFinder from '~/components/ImageFinder.vue';
    import { image as toImage } from '~/utils/url';

    const modelForm = {
    };

    export default {
        components: {
            ImageFinder,
        },
        props: {
            categoryData: {
                type: Object,
                required: false,
            },
            baseUrl: {
                type: String,
                require: false,
                default: '/admin/search/category',
            },
        },
        data() {
            const categoryForm = this.categoryData ? cloneDeep(this.categoryData) : cloneDeep(modelForm);
            return {
                loading: false,
                categoryForm,
                dialogVisible: false,
                optionCate: this.categoryData ? this.categoryData.name : [],
                rules: {
                    name: [
                        { required: true, message: 'Hãy nhập tên danh mục', trigger: 'blur' },
                        {
                            min: 1, max: 300, message: 'Độ dài nên từ 10 tới 300', trigger: 'blur',
                        },
                    ],
                },
            };
        },
        methods: {
            toImage,
            openGallery() {
                this.dialogVisible = true;
            },
            confirmPick(name) {
                this.dialogVisible = false;
                this.categoryForm.avatar = name;
            },
            async remoteCate(query) {
                if (query !== '') {
                    this.loading = true;
                    const { data: listCate } = await this.$axios.$get(`${this.baseUrl}/${query}`);
                    this.loading = false;
                    this.optionCate = listCate;
                } else {
                    this.optionCate = [];
                }
            },
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        this.$emit('submitForm', this.categoryForm);
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
