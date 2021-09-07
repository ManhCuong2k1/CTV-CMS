<template>
    <el-menu
        ref="menu"
        :collapse="collapsed"
        :default-active="active"
        :default-openeds="defaultOpeneds"
        :class="{ collapsed }"
        class="admin-sidebar h-full flex-col"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse-transition="false"
    >
        <nuxt-link to="/admin/user">
            <div class="py-4" :class="collapsed ? 'text-center' : 'flex justify-center'">
                <img v-if="!collapsed" src="/images/logo.png" class="w-16">
                <i v-else class="fa fa-home text-lg" style="color: #909399" />
            </div>
        </nuxt-link>

        <el-scrollbar wrap-class="overflow-hidden">
            <SidebarItem v-if="userLoged.type == 'admin' || userLoged.type == 'distributor'" icon="el-icon-s-home" link="/admin/dashboard">
                Tổng quan
            </SidebarItem>

            <el-submenu v-if="userLoged.type == 'admin' || userLoged.type == 'distributor'" index="1">
                <template slot="title">
                    <i class="el-icon-document" />
                    <span>Báo cáo</span>
                </template>
                <SidebarItem icon="el-icon-data-line" link="/admin/report/revenue">
                    Doanh thu
                </SidebarItem>
                <SidebarItem icon="el-icon-document" link="/admin/collaborator-revenue">
                    Doanh thu CTV
                </SidebarItem>
            </el-submenu>

            <SidebarItem icon="el-icon-coordinate" link="/admin/point-of-sale">
                Thành viên <span v-if="newNotiTask.newPointOfSale" class="ml-2 bg-red-500 px-2 text-center border border-white rounded-full">{{ newNotiTask.newPointOfSale }}</span>
            </SidebarItem>

            <SidebarItem icon="el-icon-shopping-cart-2" link="/admin/order-sale">
                Đơn hàng <span v-if="newNotiTask.newOrder" class="ml-2 bg-red-500 px-2 text-center border border-white rounded-full">{{ newNotiTask.newOrder }}</span>
            </SidebarItem>

            <SidebarItem v-if="userLoged.type == 'admin'" icon="el-icon-office-building" link="/admin/distributor">
                Nhà cung cấp
            </SidebarItem>

            <SidebarItem icon="el-icon-milk-tea" link="/admin/product">
                Sản phẩm
            </SidebarItem>

            <el-submenu v-if="userLoged.type == 'admin'" index="4">
                <template slot="title">
                    <i class="el-icon-chat-dot-square" />
                    <span>Thông báo</span>
                </template>
                <SidebarItem v-if="userLoged.type == 'admin'" icon="el-icon-mobile-phone" link="/admin/sms">
                    SMS
                </SidebarItem>
                <SidebarItem v-if="userLoged.type == 'admin'" icon="el-icon-document" link="/admin/news">
                    Tin tức
                </SidebarItem>
                <SidebarItem v-if="userLoged.type == 'admin'" icon="el-icon-bell" link="/admin/notify">
                    Thông báo nổi
                </SidebarItem>
            </el-submenu>

            <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-setting" />
                    <span>Cài đặt</span>
                </template>
                <SidebarItem v-if="userLoged.type == 'admin'" icon="el-icon-s-grid" link="/admin/category">
                    Danh mục sản phẩm
                </SidebarItem>
                <SidebarItem v-if="userLoged.type == 'admin'" icon="el-icon-map-location" link="/admin/city">
                    Địa chính
                </SidebarItem>
                <SidebarItem icon="el-icon-picture-outline" link="/admin/image">
                    Thư viện ảnh
                </SidebarItem>
                <SidebarItem v-if="userLoged.type == 'admin'" icon="el-icon-files" link="/admin/banner">
                    Ảnh bìa
                </SidebarItem>
                <SidebarItem v-if="userLoged.type == 'admin'" icon="el-icon-set-up" link="/admin/setting">
                    Cài đặt khác
                </SidebarItem>
            </el-submenu>
        </el-scrollbar>
        <ElMenuItem @click="toggleSidebar">
            <i :class="`el-icon-d-arrow-${collapsed ? 'right' : 'left'}`" />
            <template #title>
                <span>Thu gọn menu</span>
            </template>
        </ElMenuItem>
    </el-menu>
</template>

<script>
    import _findKey from 'lodash/findKey';
    import SidebarItem from './Item.vue';

    export default {
        components: {
            SidebarItem,
        },

        data() {
            return {
                active: this.$route.path,
                collapsed: false,
                defaultOpeneds: [],
                newNotiTask: {
                    newPointOfSale: 0,
                    newOrder: 0,
                    newOrderProducer: 0,
                },
            };
        },

        computed: {
            userLoged() {
                return this.$store.state.auth.user;
            },
        },

        watch: {
            '$route.path': 'setActiveItem',
        },

        mounted() {
            this.setActiveItem();
            this.getNewNotiTask();
        },

        methods: {
            toggleSidebar() {
                this.collapsed = !this.collapsed;
            },

            setActiveItem() {
                const activeItem = _findKey(this.$refs.menu.items, (_, key) => this.$route.path.startsWith(key));
                this.active = activeItem;
            },

            async getNewNotiTask() {
                const res = await this.$axios.get('/admin/search/new_noti_task');
                this.newNotiTask = res.data.data;
            },
        },
    };
</script>

<style lang="scss">
    @import '~/assets/scss/_color';
</style>
