<!-- index -->
<template>
    <!-- 中间和右边区域 -->
    <el-main style="padding: 30px 10px;height: 100%;">
        <el-row :gutter="20">
            <!-- 中间文章列表区域 -->
            <el-col :span="20" :xs="24" :sm="16" :md="16" :lg="17" :xl="17">
                <div class="middle-list">
                    <MiddleList :article="article" v-for="article in articleList" :key="article.id"></MiddleList>

                    <!-- 分页控件 -->
                    <el-pagination layout="prev, pager, next" :hide-on-single-page="false" :page-size="pageSize"
                        :total="total" @current-change="handleCurrentChange"
                        style="float: right;margin-right: 0;padding-right: 0;"></el-pagination>
                </div>
            </el-col>

            <!-- 右边搜索、分类栏 -->
            <RightBar :cateList="cateList" :hotPostList="hotPostList" :tagList="tagList"></RightBar>
        </el-row>
    </el-main>
</template>

<script lang='ts'>
    import MiddleList from '@/components/MiddleList.vue'
    import RightBar from '@/components/RightBar.vue'

    import { defineComponent, reactive, toRefs, onBeforeMount, onMounted } from 'vue'

    //引入接口
    import { fetchPostList, fetchHotPosts, fetchCategories, fetchTags } from '@/api'



    interface DataProps {
        articleList: any,
        cateList: any,
        tagList: any,
        hotPostList: any,
        // articleList: {
        //     id: number, title: string,
        //     description: string, created_at: string,
        //     cate_name: string, istop: boolean,
        // }[],
        // cateList: { id: number, name: string, blog_count: number }[],
        // tagList: { id: number, name: string }[],
        // hotPostList: { id: number, title: string }[],

        total: number,
        currentPage: number,
        pageSize: number,

    }
    export default defineComponent({
        components: {
            MiddleList,
            RightBar
        },
        name: 'index',
        setup() {

            // 1.开始创建组件-setup
            const data: DataProps = reactive({
                articleList: [],
                cateList: [],
                tagList: [],
                hotPostList: [],
                total: 0,
                currentPage: 1,
                pageSize: 6,
            });
            // 2.组件挂载页面之前执行--onBeforeMount
            onBeforeMount(() => {

            });
            // 3.组件挂载到页面之后执行---onMounted
            onMounted(() => {
                // 首页文章列表
                fetchPostList(data.currentPage, data.pageSize).then((res) => {
                    data.articleList = res.data.data;
                    // console.log(res.data.data);
                    // console.log(res.data.total, res.data.current_page, res.data.page_size);
                    data.total = res.data.total;
                    data.currentPage = res.data.current_page;
                    data.pageSize = res.data.page_size;
                }).catch((err) => {
                    console.log(err);
                });

                // 分类信息
                fetchCategories().then((res) => {
                    let cdata = res.data.data;
                    data.cateList = cdata;
                    // console.log(res.data.data);

                    window.sessionStorage.setItem("cateList", JSON.stringify(cdata));
                }).catch(err => console.log(err));

                // 最热文章
                fetchHotPosts().then((res) => {
                    let hdata = res.data.data;
                    data.hotPostList = hdata;
                    // console.log(hdata);

                    // window.sessionStorage.setItem("hotPostList", JSON.stringify(hdata));
                }).catch(err => console.log(err));


                // 标签信息
                fetchTags().then((res) => {
                    let tdata = res.data.data;
                    data.tagList = tdata;
                    // console.log(tdata);

                    // window.sessionStorage.setItem("tagList", JSON.stringify(tdata));
                }).catch(err => console.log(err));

            });

            // 翻页事件
            const handleCurrentChange = (val: any) => {
                // console.log(`current page: ${val}`);
                fetchPostList(val, data.pageSize).then((res) => {
                    data.articleList = res.data.data;

                    data.total = res.data.total;
                    data.currentPage = val;
                    data.pageSize = data.pageSize;
                }).catch((err) => {
                    console.log(err);
                });
            }

            const refData = toRefs(data);
            return {
                ...refData,
                handleCurrentChange,
            }

        }
    });
</script>
<style>
    ul.el-pager li {
        margin: 0 1px !important;
    }
</style>