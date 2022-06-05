<!-- 右边导航 -->
<template>
    <div id="nav">
        <!-- 抽屉图标按钮 -->
        <el-icon :size="25" class="drawer-icon" @click="drawer = true">
            <expand />
        </el-icon>
        <!-- 小屏幕时显示的抽屉 -->
        <el-drawer v-model="drawer" title="听雨博客" :size="'45%'" :direction="direction">
            <div class="drawer-info">
                <ul>
                    <li>
                        <a href="/about">关于我</a>
                    </li>
                </ul>
            </div>
        </el-drawer>

        <!-- 左边导航 -->
        <el-aside class="left-aside" width="200px" align="middle">
            <!-- logo -->
            <div class="logo">
                <el-avatar :size="120" src="https://s4.ax1x.com/2021/12/05/o0vOdP.png">
                </el-avatar>
                <!-- 昵称 -->
                <h1 class="nickname">听雨</h1>

                <!-- 联系方式 -->
                <div class="contact">
                    <a href="/">
                        <font-awesome-icon :icon="['fab', 'qq']" />
                    </a>
                    <a href="https://gitee.com/yuguofu">
                        <font-awesome-icon :icon="['fab', 'github']" />
                    </a>
                    <a href="/">
                        <font-awesome-icon icon="envelope" />
                    </a>
                </div>
            </div>

            <!-- 导航链接 -->
            <div class="info">
                <ul>
                    <li>
                        <a href="/">首页</a>
                    </li>
                    <li>
                        <a href="/about">关于我</a>
                    </li>
                    <li>
                        <el-popover placement="right" :width="20" trigger="hover">
                            <template #reference>
                                <a style="cursor: pointer;">书籍教程</a>
                            </template>
                            <div class="mypop">
                                <p>
                                    <a href="http://www.w3school.com.cn/" target="_blank">w3c school</a>
                                </p>
                                <p>
                                    <a href="https://www.bookstack.cn/" target="_blank">书栈网</a>
                                </p>
                            </div>
                        </el-popover>
                    </li>
                    <li>
                        <el-popover placement="right" :width="20" trigger="hover">
                            <template #reference>
                                <a>软件下载</a>
                            </template>
                            <div class="mypop">
                                <p>
                                    <a href="https://www.ghxi.com/" target="_blank">果核剥壳</a>
                                </p>
                                <p>
                                    <a href="https://www.423down.com/" target="_blank">423Down</a>
                                </p>
                            </div>
                        </el-popover>
                    </li>
                </ul>
            </div>
            <!-- 打赏二维码 -->
            <div class="qrcode">
                <img width="100" src="https://s4.ax1x.com/2021/12/05/o0xAoV.png" />
                <p>打赏博主</p>
            </div>

        </el-aside>
    </div>
</template>

<script lang='ts'>
    import { Expand, } from '@element-plus/icons'
    import { ref, defineComponent } from 'vue';

    export default defineComponent({
        name: 'Home',
        components: {
            Expand,
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
    #nav {
        height: 100%;
    }

    .left-aside {
        height: 100%;
        overflow-y: hidden !important;
        background-color: #5bc0eb;
    }

    .drawer-icon {
        display: none !important;
        /* position: absolute;
        z-index: 999;
        padding: 2px 0 0 2px;;
        color: #2196f3;
        cursor: pointer; */
    }

    @media only screen and (max-width: 768px) {
        .drawer-icon {
            display: unset !important;
            position: absolute !important;
            z-index: 999 !important;
            padding: 2px 0 0 2px !important;
            color: #2196f3 !important;
            cursor: pointer !important;
        }
    }

    .drawer-info {
        text-align: center;
    }

    .drawer-info ul {
        margin: 0 !important;
        padding: 0 !important;
    }

    .drawer-info ul li {
        border-bottom: 1px dashed #dbc98c;
        padding: 6px 0;
        list-style: none;
        margin: 10px 0;
    }

    .drawer-info ul li a {
        color: #03a9f4;
        font-size: 16px;
        font-weight: 550;
        transition: .5s;
        text-decoration: none;
        background-color: transparent;
    }

    .mypop a {
        cursor: pointer;
        text-decoration: none;
        color: unset;
    }

    .mypop a:hover {
        color: #5bc0eb;
    }


    @media only screen and (max-width: 1200px) {
        .left-aside {
            background-color: #5bc0eb;
        }
    }

    @media only screen and (max-width: 768px) {
        .left-aside {
            display: none;
            background-color: #5bc0eb;
        }
    }

    .logo {
        text-align: center;
        padding: 30px 5px;
    }

    .contact a {
        font-size: 20px;
        text-decoration: none;
        /* color: unset; */
        color: #d1f1e9;
        margin: 0 5px;
    }

    .nickname {
        margin: 10px 0;
        font-family: inherit;
        font-weight: 520;
        font-size: x-large;
        color: #fff;
        letter-spacing: 2px;
    }

    .info {
        text-align: center;
    }

    .info ul {
        margin: 0 25%;
        padding: 0;
    }


    .info ul li {
        border-bottom: 1px dashed #d1f1e9;
        padding: 6px 0;
        list-style: none;
        margin: 10px 0;
    }

    .info ul li a {
        color: #fff;
        font-size: 16px;
        font-weight: 520;
        transition: .5s;
        text-decoration: none;
        background-color: transparent;
    }

    .info ul li a:hover {
        color: rgba(240, 230, 191, 0.8);
    }

    .qrcode {
        margin-top: 150px;
        text-align: center;
    }
</style>