<template>
    <div>
        <el-form
            ref="reviewForm"
            :model="reviewForm"
            label-width="120px"
            class="w-full"
            :rules="rules"
        >
            <el-form-item label="Đánh giá">
                <BookVote :rate="reviewForm.vote || 0" @selected="updateVote" />
            </el-form-item>
            <el-form-item label="Sách" prop="bookId">
                <el-col :span="24">
                    <el-select
                        v-model="reviewForm.bookId"
                        class="w-full"
                        filterable
                        remote
                        reserve-keyword
                        placeholder="Chọn sách"
                        :remote-method="remoteBook"
                        :loading="loading"
                    >
                        <el-option
                            v-for="item in optionBook"
                            :key="item.hash_id"
                            :label="item.title"
                            :value="item.hash_id"
                        />
                    </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="Nội dung" prop="content">
                <el-col :span="24">
                    <Tinymce
                        :content="reviewForm.content"
                        @contentChange="contentChange"
                    />
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="publishForm('reviewForm')">
                    Đăng bài
                </el-button>
                <el-button @click="draftForm('reviewForm')">
                    Lưu nháp
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import cloneDeep from 'lodash/cloneDeep';
    import Tinymce from '~/components/editor/Tinymce.vue';
    import { image as toImage } from '~/utils/url';
    import { validString } from '~/utils/form';
    import BookVote from '~/components/user/book/BookVote.vue';

    const modelForm = {
        content: '',
        bookId: '',
        vote: 0,
    };

    export default {
        components: {
            Tinymce,
            BookVote,
        },
        async fetch() {
            if (this.$route.query.bookId) {
                const { data: book } = await this.$axios.$get(`/web/book/get/${this.$route.query.bookId}`);
                this.optionBook = [book];
                this.reviewForm.bookId = book.hash_id;
            }
        },
        data() {
            const reviewForm = cloneDeep(modelForm);
            return {
                dialogVisible: false,
                loading: false,
                reviewForm,
                optionBook: [],
                rules: {
                    content: [
                        {
                            required: true,
                            message: 'Vui lòng nhập nội dung',
                            trigger: 'blur',
                        },
                        {
                            min: 1,
                            max: 30000,
                            validator: validString,
                            trigger: 'blur',
                        },
                    ],
                    bookId: [
                        {
                            required: true,
                            message: 'Vui lòng chọn sách',
                            trigger: 'blur',
                        },
                    ],
                },
            };
        },
        methods: {
            toImage,
            async submitRated(rate) {
                try {
                    this.loading = true;
                    await this.$axios.$post('/web/book/rated', {
                        rate,
                        bookId: this.reviewForm.bookId,
                    });
                } catch (error) {
                    this.$message.error(this.$constants.ERROR_MESSAGE.Default);
                } finally {
                    this.loading = false;
                }
            },
            async remoteBook(query) {
                if (query !== '') {
                    this.loading = true;
                    const { data: res } = await this.$axios.$get(`/search/book/${query}`);
                    this.loading = false;
                    this.optionBook = res;
                } else {
                    this.optionBook = [];
                }
            },
            openGallery() {
                this.dialogVisible = true;
            },
            confirmPick(name) {
                this.dialogVisible = false;
                this.reviewForm.avatar = name;
            },
            contentChange(content) {
                this.reviewForm.content = content;
            },
            updateVote(vote) {
                this.reviewForm.vote = vote;
            },
            publishForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        if (this.bookHashId) {
                            this.reviewForm.bookHashId = this.bookHashId;
                        }
                        this.reviewForm.status = 'create';
                        this.$emit('publishForm', this.reviewForm);
                    } else {
                        return false;
                    }
                });
            },
            draftForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        if (this.bookHashId) {
                            this.reviewForm.bookHashId = this.bookHashId;
                        }
                        this.reviewForm.status = 'draft';
                        this.$emit('draftForm', this.reviewForm);
                    } else {
                        return false;
                    }
                });
            },
        },
    };
</script>
