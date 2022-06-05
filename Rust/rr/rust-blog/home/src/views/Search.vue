<!-- 搜索 -->
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
            <!-- <RightBar :cateList="cateList" :hotPostList="hotPostList" :tagList="tagList"></RightBar> -->
        </el-row>
    </el-main>
</template>

<script lang='ts'>
    import MiddleList from '@/components/MiddleList.vue'
    import RightBar from '@/components/RightBar.vue'

    import { defineComponent, reactive, toRefs, onBeforeMount, onMounted } from 'vue'
    import { useRoute } from 'vue-router'

    //引入接口
    import { searchArticle, } from '@/api'


    interface DataProps {
        articleList: any,
    }

    export default defineComponent({
        name: '搜索',
        components: {
            MiddleList,
            RightBar,
        },
        setup() {
            const route = useRoute();
            let word = "";

            // 1.开始创建组件-setup
            const data: DataProps = reactive({
                articleList: [],

            });
            // 2.组件挂载页面之前执行--onBeforeMount
            onBeforeMount(() => {
            });

            // 3.组件挂载到页面之后执行---onMounted
            onMounted(() => {
                word = String(route.params.word);
                if (word.trim().length == 0) { return; }
                searchArticle(word).then((res) => {
                    data.articleList = res.data.data;
                    // console.log(res.data.data);
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