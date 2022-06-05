<!-- 文章详情 -->
<template>
    <!-- 文章内容区域 -->
    <el-main style="padding: 30px 10px;height: 100%;margin-bottom: 20px;">
        <el-row :gutter="20" style="height: 100%;">
            <!-- 中间文章列表区域 -->
            <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style="height: 100%;">
                <div class="article-main">
                    <article class="article-view">
                        <h1 class="article-title">{{ article.title }}</h1>

                        <div class="article-meta">
                            <span>作者: 听雨</span>
                            <span>
                                分类:
                                <!-- <a href="/">{{}}</a> -->
                            </span>
                            <span>发布时间： {{ article.created_at }}</span>
                        </div>

                        <div class="article-desc">{{ article.description }}</div>

                        <!-- <div class="article-content">
                            {{ article.content }}
                        </div> -->
                        <!-- 正文 -->
                        <div class="article-content" v-highlight v-html="articleContent"></div>
                    </article>
                </div>
            </el-col>
        </el-row>
    </el-main>
</template>

<script lang='ts'>
    import { defineComponent, ref, reactive, toRefs, onBeforeMount, onMounted } from 'vue'
    import { useRoute } from 'vue-router'
    import { fetchPostDetail, } from '@/api'

    import MarkdownIt from 'markdown-it'

    interface DataProps {
        // article: { id: number, title: string, description: string, content: string },
        article: any,
        articleContent: string,
    }

    export default defineComponent({
        name: 'detail',
        props: ['id'],
        setup() {
            const route = useRoute();

            // 1.开始创建组件-setup
            const data: DataProps = reactive({
                article: {},
                articleContent: "",
            });

            // 2.组件挂载页面之前执行--onBeforeMount
            onBeforeMount(() => {

            });

            // 3.组件挂载到页面之后执行---onMounted
            onMounted(() => {
                // 获取文章id
                const id: number = Number(route.params.id);
                // console.log("文章id： ", id);

                // 根据文章id获取文章信息
                fetchPostDetail(id).then((res) => {
                    let artData = res.data.data;
                    data.article = artData;
                    // console.log(res.data.data);

                    const md = new MarkdownIt();
                    data.articleContent = md.render(artData.content);
                }).catch(err => console.log(err));
            });

            const refData = toRefs(data);
            return {
                ...refData,
            }

        }
    });
</script>

<style scoped>
    .article-main {
        height: 100%;
        margin: auto;
        padding: 0 20px;
    }

    .article-view {
        height: 100%;
        margin: auto;
        margin-bottom: 20px;
        /* text-align: center; */
        width: 80%;
    }

    .article-title {
        color: #2f2f2f;
        font-size: 30px;
        font-weight: bold;
        margin: 0 0 20px 0;
    }

    .article-meta {
        font-size: 13px;
        color: #555;
        margin: 10px 0;
    }

    .article-meta span {
        margin-right: 15px;
    }

    .article-desc {
        color: #2f2f2f;
        font-size: 14px;
        border: dashed 1.5px;
        border-color: coral;
        border-left: none;
        border-right: none;
        padding: 10px 0;
        margin: 20px 0 10px 0;
    }

    .article-content {
        padding: 15px 0;
        /* color: #2f2f2f; */
        font-weight: 400;
    }
</style>