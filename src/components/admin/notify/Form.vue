<template>
    <div>
        <el-form
            ref="notifyForm"
            :model="notifyForm"
            label-width="200px"
            class="w-full"
            :rules="rules"
        >
            <el-form-item label="Thời gian gửi" prop="timeSend">
                <el-date-picker
                    v-model="notifyForm.timeSend"
                    type="datetime"
                    placeholder="Thời gian gửi tin nhắn"
                />
            </el-form-item>
            <el-form-item label="Tiêu đề" prop="title" class="w-1/2">
                <el-col :span="12">
                    <el-input v-model="notifyForm.title" placeholder="Tiêu đề tin nhắn" />
                </el-col>
            </el-form-item>
            <el-form-item label="Nội dung" prop="content" class="w-1/2">
                <el-col :span="12">
                    <el-input v-model="notifyForm.content" placeholder="Nội dung tin nhắn" />
                </el-col>
            </el-form-item>
            <el-form-item label="Ảnh" prop="image">
                <el-col :span="12">
                    <el-button @click="openGallery">
                        <span v-if="!notifyForm.image">Chọn ảnh</span>
                        <div v-else>
                            <img class="w-32" :src="toImage(notifyForm.image, 'avatar')">
                        </div>
                    </el-button>
                </el-col>
            </el-form-item>
            <el-form-item label="Đối tượng" prop="target" class="w-1/2">
                <el-select v-model="notifyForm.target" placeholder="Đối tượng">
                    <el-option
                        :label="'Điểm bán'"
                        :value="'pointofsale'"
                    />
                    <el-option
                        :label="'Nhà phân phối'"
                        :value="'distributor'"
                    />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('notifyForm')">
                    Lưu
                </el-button>
                <el-button @click="resetForm('notifyForm')">
                    Làm mới
                </el-button>
            </el-form-item>
        </el-form>
        <el-dialog
            title="Chọn ảnh"
            :visible.sync="dialogGallery"
        >
            <ImageFinder @confirmPick="confirmPick" />
        </el-dialog>
    </div>
</template>

<script>
    import cloneDeep from 'lodash/cloneDeep';
    import { validString } from '~/utils/form';
    import { image as toImage } from '~/utils/url';
    import ImageFinder from '~/components/ImageFinder.vue';

    const modelForm = {
        content: '',
        searchKey: '',
        timeSend: '',
    };

    export default {
        components: {
            ImageFinder,
        },

        props: {
            notifyData: {
                type: Object,
                required: false,
            },
        },
        data() {
            const notifyForm = this.notifyData ? cloneDeep(this.notifyData) : cloneDeep(modelForm);
            return {
                dialogGallery: false,
                loading: false,
                notifyForm,
                rules: {
                    content: [
                        { required: true, message: 'Vui lòng nhập nội dung tin nhắn', trigger: 'blur' },
                        {
                            min: 1, max: 255, validator: validString, trigger: 'blur',
                        },
                    ],
                    title: [
                        { required: true, message: 'Vui lòng nhập tiêu đề tin nhắn', trigger: 'blur' },
                        {
                            min: 1, max: 255, validator: validString, trigger: 'blur',
                        },
                    ],
                    timeSend: [
                        { required: true, message: 'Vui lòng nhập thời gian gửi', trigger: 'blur' },
                    ],
                },
            };
        },
        watch: {
            notifyData() {
                this.notifyForm = this.notifyData ? cloneDeep(this.notifyData) : cloneDeep(modelForm);
            },
        },
        methods: {
            toImage,
            openGallery() {
                this.dialogGallery = true;
            },
            confirmPick(name) {
                this.dialogGallery = false;
                this.notifyForm.image = name;
            },
            contentChange(content) {
                this.notifyForm.content = content;
            },
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        this.$emit('submitForm', this.notifyForm);
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
