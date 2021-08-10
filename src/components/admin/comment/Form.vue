<template>
    <div>
        <el-form
            ref="commentForm"
            :model="commentForm"
            label-width="120px"
            class="w-full"
            :rules="rules"
        >
            <el-form-item label="Content" prop="summary">
                <el-col :span="24">
                    <Tinymce
                        :content="commentForm.content"
                        @contentChange="contentChange"
                    />
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('commentForm')">
                    Lưu
                </el-button>
                <el-button @click="resetForm('commentForm')">
                    Làm mới
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import Tinymce from '~/components/editor/Tinymce.vue';

    export default {
        components: {
            Tinymce,
        },

        props: {
            commentData: {
                type: Object,
                required: true,
            },
        },
        data() {
            return {
                loading: false,
                commentForm: this.commentData,
                rules: {
                    content: [
                        { required: true, message: 'Please input content', trigger: 'blur' },
                        {
                            min: 1, max: 3000, message: 'Length should be 10 to 3000', trigger: 'blur',
                        },
                    ],
                },
            };
        },
        methods: {
            contentChange(content) {
                this.commentForm.content = content;
            },
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        this.$emit('submitForm', this.commentForm);
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
