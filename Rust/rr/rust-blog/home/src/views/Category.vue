<!-- 分类 -->
<template>
    <!-- 中间和右边区域 -->
    <el-main style="padding: 30px 10px;height: 100%;">
        <el-row :gutter="20">
            <!-- 中间文章列表区域 -->
            <el-col :span="20" :xs="24" :sm="16" :md="16" :lg="17" :xl="17">
                <div class="middle-list">
                    <MiddleList :article="article" v-for="article in articleList" :key="article.id"></MiddleList>
                </div>
            </el-col>

            <!-- 右边搜索、分类栏 -->
            <RightBar :cateList="cateList"></RightBar>
        </el-row>
    </el-main>
</template>

<script lang='ts'>
    import MiddleList from '@/components/MiddleList.vue'
    import RightBar from '@/components/RightBar.vue'

    import { defineComponent, reactive, toRefs, onBeforeMount, onMounted } from 'vue'
    import { useRoute } from 'vue-router'

    //引入接口
    import { fetchArtListByCid, } from '@/api'


    interface DataProps {
        articleList: any,
        // articleList: {
        //     id: number, title: string,
        //     description: string, created_at: string,
        //     cate_name: string, istop: boolean,
        // }[],
        // cateList: { id: number, name: string, blog_count: number }[],
        // tagList: { id: number, name: string }[],
        // hotPostList: { id: number, title: string }[],
        cateList: any,
        // tagList: any,
        // hotPostList: any,
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
                cateList: [],
                // tagList: [],
                // hotPostList: [],
            });
            // 2.组件挂载页面之前执行--onBeforeMount
            onBeforeMount(() => {
            });

            // 3.组件挂载到页面之后执行---onMounted
            onMounted(() => {
                const cid: number = Number(route.params.cid);
                fetchArtListByCid(cid).then((res) => {
                    data.articleList = res.data.data;
                    // console.log(res.data.data);

                    let c = String(window.sessionStorage.getItem("cateList"));
                    // console.log(JSON.parse(c));
                    data.cateList = JSON.parse(c);
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