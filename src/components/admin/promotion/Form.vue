<template>
    <div>
        <el-form
            ref="promotionForm"
            :model="promotionForm"
            label-width="200px"
            class="w-full"
            :rules="rules"
        >
            <el-form-item label="Loại" prop="type">
                <el-switch
                    v-model="promotionForm.type"
                    active-text="Quà tặng"
                    active-value="gift"
                    inactive-text="Chiết khấu"
                    inactive-value="value"
                />
            </el-form-item>
            <el-form-item label="Tiêu đề" prop="title">
                <el-col :span="12">
                    <el-input v-model="promotionForm.title" placeholder="Tiêu đề" />
                </el-col>
            </el-form-item>
            <el-form-item label="Ảnh đại diện" prop="avatar">
                <el-col :span="12">
                    <el-button @click="openGallery">
                        <span v-if="!promotionForm.avatar">Bộ sưu tập</span>
                        <div v-else>
                            <img class="w-32" :src="toImage(promotionForm.avatar, 'thumbnail')">
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
            <el-form-item label="Ngày bắt đầu" prop="startDate">
                <el-date-picker
                    v-model="promotionForm.startDate"
                    value-format="timestamp"
                    type="date"
                    placeholder="Ngày bắt đầu"
                />
            </el-form-item>
            <el-form-item label="Ngày kết thúc" prop="endDate">
                <el-date-picker
                    v-model="promotionForm.endDate"
                    value-format="timestamp"
                    type="date"
                    placeholder="Ngày kết thúc"
                />
            </el-form-item>
            <el-form-item label="Sản phẩm tối thiểu" prop="minPerOrder">
                <el-col :span="12">
                    <el-input v-model="promotionForm.minPerOrder" type="number" placeholder="Số lượng tối thiểu trên đơn hàng" />
                </el-col>
            </el-form-item>
            <el-form-item label="Sản phẩm tối đa" prop="maxPerOrder">
                <el-col :span="12">
                    <el-input v-model="promotionForm.maxPerOrder" type="number" placeholder="Số lượng tối đa trên đơn hàng" />
                </el-col>
            </el-form-item>
            <el-form-item v-if="promotionForm.type == 'value'" label="Giá trị khuyến mãi (%)" prop="promotionAmount">
                <el-col :span="12">
                    <el-input v-model="promotionForm.promotionAmount" type="number" placeholder="Giá trị khuyến mãi (%)" />
                </el-col>
            </el-form-item>
            <el-form-item v-if="promotionForm.type == 'gift'" label="Số lượng quà còn" prop="promotionGiftAmount">
                <el-col :span="12">
                    <el-input v-model="promotionForm.promotionGiftAmount" type="number" placeholder="Số lượng quà còn" />
                </el-col>
            </el-form-item>
            <el-form-item label="Tặng nhiều lần" prop="multiTimes">
                <el-switch
                    v-model="promotionForm.multiTimes"
                    active-color="#13ce66"
                    inactive-color="#dcdfe6"
                    :active-value="true"
                    :inactive-value="false"
                />
            </el-form-item>
            <el-form-item label="Hiển thị trên trang chủ" prop="onHome">
                <el-switch
                    v-model="promotionForm.onHome"
                    active-color="#13ce66"
                    inactive-color="#dcdfe6"
                    :active-value="1"
                    :inactive-value="0"
                />
            </el-form-item>
            <el-form-item label="Nội dung" prop="description">
                <el-col :span="24">
                    <Tinymce
                        :content="promotionForm.description"
                        @contentChange="descriptionChange"
                    />
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('promotionForm')">
                    Lưu
                </el-button>
                <el-button @click="resetForm('promotionForm')">
                    Làm mới
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import cloneDeep from 'lodash/cloneDeep';
    import Tinymce from '~/components/editor/Tinymce.vue';
    import ImageFinder from '~/components/ImageFinder.vue';
    import { image as toImage } from '~/utils/url';
    import { validString, validInteger } from '~/utils/form';

    const modelForm = {
        type: 'value',
        multiTimes: false,
        title: '',
        avatar: '',
        description: '',
        searchKey: '',
        startDate: '',
        endDate: '',
        promotionAmount: null,
        maxPerOrder: null,
        minPerOrder: null,
        onHome: null,
    };

    export default {
        components: {
            Tinymce,
            ImageFinder,
        },

        props: {
            promotionData: {
                type: Object,
                required: false,
            },
        },
        data() {
            const promotionForm = this.promotionData ? cloneDeep(this.promotionData) : cloneDeep(modelForm);
            promotionForm.promotionAmount *= 100;
            return {
                dialogVisible: false,
                loading: false,
                promotionForm,
                rules: {
                    title: [
                        { required: true, message: 'Vui lòng nhập tiêu đề', trigger: 'blur' },
                        {
                            min: 1, max: 300, validator: validString, trigger: 'blur',
                        },
                    ],
                    startDate: [
                        { required: true, message: 'Vui lòng nhập ngày bắt đầu', trigger: 'blur' },
                    ],
                    endDate: [
                        { required: true, message: 'Vui lòng nhập ngày kết thúc', trigger: 'blur' },
                    ],
                    minPerOrder: [
                        { required: true, message: 'Vui lòng nhập số sản phẩm tối thiểu', trigger: 'blur' },
                    ],
                    maxPerOrder: [
                        { required: true, message: 'Vui lòng nhập số sản phẩm tối đa', trigger: 'blur' },
                    ],
                    promotionGiftAmount: [
                        {
                            required: true, validator: validInteger, message: 'Vui lòng nhập số lượng quà là số nguyên', trigger: 'blur',
                        },
                    ],
                    promotionAmount: [
                        {
                            required: true, validator: validInteger, message: 'Vui lòng nhập giá trị khuyến mại là số nguyên', trigger: 'blur',
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
                this.promotionForm.avatar = name;
            },
            descriptionChange(description) {
                this.promotionForm.description = description;
            },
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        this.promotionForm.startDate /= 1000;
                        this.promotionForm.endDate /= 1000;
                        this.$emit('submitForm', this.promotionForm);
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
