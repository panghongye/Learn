<!-- 标签 -->
<template>
    <!-- 中间和右边区域 -->
    <el-main style="padding: 30px 10px;height: 100%;">
        <el-row :gutter="20">
            <!-- 中间文章列表区域 -->
            <el-col :span="20" :xs="24" :sm="16" :md="16" :lg="17" :xl="17">
                <div class="middle-list">

                    <template v-if="articleList.length>0">
                        <MiddleList :article="article" v-for="article in articleList" :key="article.id"></MiddleList>
                    </template>
                    <template v-else>
                        <el-card shadow="always">
                            <span style="color: #e6a23c;">没有相关文章!</span>
                        </el-card>
                    </template>
                </div>
            </el-col>

            <!-- 右边搜索、分类栏 -->
            <RightBar :tagList="tagList"></RightBar>
        </el-row>
    </el-main>
</template>

<script lang='ts'>
    import MiddleList from '@/components/MiddleList.vue'
    import RightBar from '@/components/RightBar.vue'

    import { defineComponent, reactive, toRefs, onBeforeMount, onMounted } from 'vue'
    import { useRoute } from 'vue-router'

    //引入接口
    import { fetchArtListByTid, } from '@/api'


    interface DataProps {
        articleList: any,
        tagList: any,
    }

    export default defineComponent({
        name: '分类',
        components: {
            MiddleList,
            RightBar,
        },
        setup() {
            const route = useRoute();

            // 1.开始创建组件-setup
            const data: DataProps = reactive({
                articleList: [],
                tagList: [],
            });
            // 2.组件挂载页面之前执行--onBeforeMount
            onBeforeMount(() => {
            });

            // 3.组件挂载到页面之后执行---onMounted
            onMounted(() => {
                const tid: number = Number(route.params.tid);
                fetchArtListByTid(tid).then((res) => {
                    data.articleList = res.data.data;
                    // console.log(res.data.data);

                    let t = String(window.sessionStorage.getItem("tagList"));
                    data.tagList = JSON.parse(t);
                }).catch((err) => {
                    console.log(err);
                });

            });

            const refData = toRefs(data);
            return {
                ...refData,
            }

        }
    });
</script>
<style scoped>
</style>