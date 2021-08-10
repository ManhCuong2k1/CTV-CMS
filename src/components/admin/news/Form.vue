<template>
    <div>
        <el-form
            ref="newsForm"
            :model="newsForm"
            label-width="120px"
            class="w-full"
            :rules="rules"
        >
            <el-form-item label="Tiêu đề" prop="title">
                <el-col :span="12">
                    <el-input v-model="newsForm.title" placeholder="Tiêu đề" />
                </el-col>
            </el-form-item>
            <el-form-item label="Nội dung ngắn" prop="summary">
                <el-col :span="12">
                    <el-input v-model="newsForm.summary" type="textarea" placeholder="Nội dung ngắn" />
                </el-col>
            </el-form-item>
            <el-form-item label="Hình ảnh" prop="avatar">
                <el-col :span="12">
                    <el-button @click="openGallery">
                        <span v-if="!newsForm.avatar">Bộ sưu tập</span>
                        <div v-else>
                            <img class="w-32" :src="toImage(newsForm.avatar, 'thumbnail')">
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
            <el-form-item label="Danh mục" prop="type">
                <el-col :span="24">
                    <el-select
                        v-model="newsForm.type"
                        class="filter-item"
                        placeholder="Nhập danh mục"
                    >
                        <el-option
                            v-for="item in optionCate"
                            :key="item.key"
                            :label="item.value"
                            :value="item.key"
                        />
                    </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="Nội dung bài" prop="content">
                <el-col :span="24">
                    <Tinymce
                        :content="newsForm.content"
                        @contentChange="contentChange"
                    />
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('newsForm')">
                    Lưu
                </el-button>
                <el-button @click="resetForm('newsForm')">
                    Làm mới
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import slugify from 'slugify';
    import { mapState } from 'vuex';
    import cloneDeep from 'lodash/cloneDeep';
    import Tinymce from '~/components/editor/Tinymce.vue';
    import ImageFinder from '~/components/ImageFinder.vue';
    import { image as toImage } from '~/utils/url';
    import { validString } from '~/utils/form';

    const modelForm = {
        title: '',
        slug: '',
        summary: '',
        avatar: '',
        type: '',
        content: '',
    };

    export default {
        components: {
            Tinymce,
            ImageFinder,
        },

        props: {
            newsData: {
                type: Object,
                required: false,
            },
        },
        data() {
            const newsForm = this.newsData ? cloneDeep(this.newsData) : cloneDeep(modelForm);
            return {
                dialogVisible: false,
                loading: false,
                optionCate: [
                    { key: 'announcements', value: 'Thông báo' },
                    { key: 'news', value: 'Tin thường' },
                ],
                newsForm,
                rules: {
                    title: [
                        { required: true, message: 'Vui lòng nhập tiêu đề', trigger: 'blur' },
                        {
                            min: 1, max: 300, validator: validString, trigger: 'blur',
                        },
                    ],
                    summary: [
                        { required: true, message: 'Vui lòng nhập nội dung ngắn', trigger: 'blur' },
                        {
                            min: 1, max: 2000, validator: validString, trigger: 'blur',
                        },
                    ],
                    type: [
                        { required: true, message: 'Vui lòng nhập danh mục', trigger: 'blur' },
                    ],
                },
            };
        },
        computed: {
            ...mapState('admin/common', ['optionNewsCates']),
        },
        methods: {
            toImage,
            openGallery() {
                this.dialogVisible = true;
            },
            confirmPick(name) {
                this.dialogVisible = false;
                this.newsForm.avatar = name;
            },
            contentChange(content) {
                this.newsForm.content = content;
            },
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        if (this.newsForm.slug === '') {
                            this.newsForm.slug = slugify(this.newsForm.title);
                        }
                        this.$emit('submitForm', this.newsForm);
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
