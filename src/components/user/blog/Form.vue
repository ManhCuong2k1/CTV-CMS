<template>
    <div>
        <el-form
            ref="postForm"
            :model="postForm"
            class="w-full"
            :rules="rules"
        >
            <div class="flex">
                <div class="w-full mr-2">
                    <el-form-item prop="title">
                        <div>
                            <el-input v-model="postForm.title" class="w-full" placeholder="Nhập tiêu đề" />
                        </div>
                    </el-form-item>
                </div>
                <div class="mr-2">
                    <el-button type="primary" @click="publishForm('postForm')">
                        Đăng bài
                    </el-button>
                </div>
                <div>
                    <el-button @click="draftForm('postForm')">
                        Lưu nháp
                    </el-button>
                </div>
            </div>

            <div class="flex">
                <div class="w-full mr-2">
                    <el-form-item prop="selectedTag">
                        <el-select
                            v-model="postForm.selectedTag"
                            filterable
                            multiple
                            remote
                            reserve-keyword
                            clearable
                            placeholder="Hãy chọn tag"
                            :remote-method="remoteTag"
                            :loading="loading"
                            class="w-full"
                        >
                            <el-option
                                v-for="item in optionTag"
                                :key="item.hash_id"
                                :label="item.name"
                                :value="item.hash_id"
                            />
                        </el-select>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item prop="categoryId">
                        <el-select
                            v-model="postForm.categoryId"
                            filterable
                            remote
                            reserve-keyword
                            clearable
                            placeholder="Chọn thể loại"
                            :remote-method="remoteCate"
                            :loading="loading"
                        >
                            <el-option
                                v-for="item in optionCate"
                                :key="item.hash_id"
                                :label="item.title"
                                :value="item.hash_id"
                            />
                        </el-select>
                    </el-form-item>
                </div>
            </div>

            <div class="flex">
                <div class="w-full mr-2">
                    <el-form-item prop="summary">
                        <el-input v-model="postForm.summary" type="textarea" placeholder="Nhập Tóm lược" />
                    </el-form-item>
                </div>
                <div>
                    <el-form-item prop="avatar">
                        <div>
                            <el-button @click="openGallery">
                                <span v-if="!postForm.avatar">Chọn ảnh đại diện</span>
                                <div v-else>
                                    <img :src="toImage(postForm.avatar, 'avatar')">
                                </div>
                            </el-button>
                            <div class="text-center leading-tight">
                                <span v-if="postForm.avatar" class="text-red-500 cursor-pointer" @click="postForm.avatar=''">
                                    Xóa
                                </span>
                            </div>

                            <el-dialog
                                title="Media"
                                :visible.sync="dialogVisible"
                                width="50%"
                            >
                                <ImageFinder @confirmPick="confirmPick" />
                            </el-dialog>
                        </div>
                    </el-form-item>
                </div>
            </div>

            <el-form-item prop="content">
                <el-col :span="24">
                    <Tinymce
                        :content="postForm.content"
                        @contentChange="contentChange"
                    />
                </el-col>
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
        summary: '',
        avatar: '',
        categoryId: '',
        status: '',
        content: '',
        selectedTag: '',
    };

    export default {
        components: {
            Tinymce,
            ImageFinder,
        },
        data() {
            const postForm = cloneDeep(modelForm);
            return {
                dialogVisible: false,
                loading: false,
                optionCate: [],
                optionTag: [],
                postForm,
                rules: {
                    title: [
                        { required: true, message: 'Vui lòng nhập tiêu đề', trigger: 'blur' },
                        {
                            min: 1, max: 300, validator: validString, trigger: 'blur',
                        },
                    ],
                    selectedTag: [
                        { required: true, message: 'Vui lòng thêm tag', trigger: 'blur' },
                    ],
                    categoryId: [
                        { required: true, message: 'Vui lòng chọn thể loại', trigger: 'blur' },
                    ],
                    summary: [
                        { required: true, message: 'Vui lòng nhập tóm lược', trigger: 'blur' },
                        {
                            min: 1, max: 2000, validator: validString, trigger: 'blur',
                        },
                    ],
                    status: [
                        { required: true, message: 'Vui lòng chọn trạng thái', trigger: 'blur' },
                    ],
                },
            };
        },
        computed: {
            ...mapState('user/common', ['optionCates', 'optionTags']),
        },
        methods: {
            toImage,
            openGallery() {
                this.dialogVisible = true;
            },
            confirmPick(name) {
                this.dialogVisible = false;
                this.postForm.avatar = name;
            },
            contentChange(content) {
                this.postForm.content = content;
            },
            async remoteCate(query) {
                if (query !== '') {
                    this.loading = true;
                    await this.$store.dispatch('user/common/searchCates', query);
                    this.loading = false;
                    this.optionCate = this.optionCates;
                } else {
                    this.optionCate = [];
                }
            },
            async remoteTag(query) {
                if (query !== '') {
                    this.loading = true;
                    await this.$store.dispatch('user/common/searchTags', query);
                    this.loading = false;
                    this.optionTag = this.optionTags;
                } else {
                    this.optionTag = [];
                }
            },
            publishForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        if (this.postForm.slug === '') {
                            this.postForm.slug = slugify(this.postForm.title);
                        }
                        this.postForm.status = 'create';
                        this.$emit('publishForm', this.postForm);
                    } else {
                        return false;
                    }
                });
            },
            draftForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        if (this.postForm.slug === '') {
                            this.postForm.slug = slugify(this.postForm.title);
                        }
                        this.postForm.status = 'draft';
                        this.$emit('draftForm', this.postForm);
                    } else {
                        return false;
                    }
                });
            },
        },
    };
</script>
