<template>
    <div id="home">
        <el-container style="height: 100%;">
            <!-- 导航栏 -->
            <Nav></Nav>

            <el-container style="height: 100%;">
                <keep-alive>
                    <router-view v-if="$route.meta.keepAlive"></router-view>
                </keep-alive>
                <router-view v-if="!$route.meta.keepAlive"></router-view>

                <!-- 网站底部 -->
                <el-footer class="my-el-footer" style="--el-footer-height: unset; --el-footer-padding: unset;">
                    <Footer></Footer>
                </el-footer>

            </el-container>
        </el-container>
    </div>
</template>

<script lang="ts">
    // 引入组件
    import { Search, Paperclip, Expand, Collection, Document, Calendar } from '@element-plus/icons'
    import Nav from '@/components/Nav.vue'
    import Footer from '@/components/Footer.vue'

    import { defineComponent, ref, } from 'vue'

    export default defineComponent({
        name: 'Home',
        components: {
            Paperclip,
            Search,
            Expand,
            Collection,
            Document,
            Calendar,
            Nav,
            Footer,
        },
        setup() {
            const drawer = ref(false)
            const direction = ref('rtl')
            return {
                drawer,
                direction
            }
        }
    });
</script>

<style>
    #home {
        height: 100%;
    }

    .my-el-footer {
        position: fixed;
        bottom: 0;
        width: 100%;
    }
</style>