<!-- 关于 -->
<template>
    <el-main style="padding: 30px 10px;height: 100%;">
        <el-row :gutter="20" style="height: 100%;">
            <!-- 中间文章列表区域 -->
            <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style="height: 100%;">
                <div class="detail-main">
                    <article class="detail-view" style="height: 100%;margin: auto;">
                        <h1 class="detail-title">关于我</h1>

                        <div class="detail-content">
                            <p>一位没有故事的家伙...</p>
                            <p>90后大好青年</p>
                            <p>90后大好青年</p>
                            <p>90后大好青年</p>
                            <p>90后大好青年</p>
                        </div>

                    </article>
                </div>
            </el-col>
        </el-row>
    </el-main>
</template>

<script lang='ts'>
    import { StarFilled } from '@element-plus/icons'

    import { reactive, toRefs, onBeforeMount, onMounted, defineComponent } from 'vue'

    interface DataProps {
        title: string,
    }
    export default defineComponent({
        name: 'about',
        setup() {
            // 1.开始创建组件-setup
            const data: DataProps = reactive({
                title: "哈哈哈哈哈",
            })
            // 2.组件挂载页面之前执行--onBeforeMount
            onBeforeMount(() => {
            })
            // 3.组件挂载到页面之后执行---onMounted
            onMounted(() => {
            })
            const refData = toRefs(data);
            return {
                ...refData,
            }

        }
    });
</script>
<style scoped>
    .detail-main {
        height: 100%;
        margin: auto;
        padding: 0 20px;
    }

    .detail-view {
        height: 100%;
        margin: auto;
        /* text-align: center; */
        width: 80%;
    }

    .detail-title {
        color: #2f2f2f;
        font-size: 30px;
        font-weight: bold;
        margin: 0 0 20px 0;
    }

    .detail-content {
        padding: 15px 0;
        /* color: #2f2f2f; */
        font-weight: 400;
    }
</style>