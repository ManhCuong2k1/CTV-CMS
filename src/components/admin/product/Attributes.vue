<template>
    <div>
        <div v-for="(item, index) in listAtt" :key="index" class="flex mb-2">
            <span class="mr-3">
                <el-input v-model="item.key" placeholder="Tên" @change="$emit('update:data', listAtt)" />
            </span>
            <span class="mr-3">
                <el-input v-model="item.value" placeholder="Giá trị" @change="$emit('update:data', listAtt)" />
            </span>
            <span v-if="index">
                <el-button
                    icon="el-icon-delete"
                    @click="deleteRow(index)"
                />
            </span>
            <span v-else>
                <el-button
                    icon="el-icon-plus"
                    @click="add()"
                />
            </span>
        </div>
    </div>
</template>

<script>
    import cloneDeep from 'lodash/cloneDeep';

    const defaultItem = { key: '', value: '' };

    export default {
        props: {
            data: {
                type: Array,
            },
        },
        data() {
            let listAtt = null;
            try {
                listAtt = this.data.length ? cloneDeep(this.data) : cloneDeep([defaultItem]);
            } catch (error) {
                listAtt = [{}];
            }
            return {
                listAtt,
            };
        },
        methods: {
            add() {
                this.listAtt.splice(0, 0, cloneDeep(defaultItem));
                this.$emit('update:data', this.listAtt);
            },
            deleteRow(index) {
                this.listAtt.splice(index, 1);
            },
        },
    };
</script>
