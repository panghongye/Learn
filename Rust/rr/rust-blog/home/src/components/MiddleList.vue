<!-- 中间列表 -->
<template>
    <!-- 中间文章列表区域 -->

    <!-- 置顶链接 -->
    <h1 class="uptop" v-if="article.istop">
        <font-awesome-icon :icon="['fa', 'arrow-circle-up']" style="margin-right: 5px;" />
        <a :href="`/article/${article.id}`">{{ article.title }}</a>
    </h1>

    <!-- 文章列表 -->
    <el-card shadow="always" style="margin-bottom: 20px;">
        <a :href="`/article/${article.id}`" class="article-title">{{ article.title }}</a>
        <div style="padding: 14px">
            <p>{{ article.description }}</p>
            <div class="article-info">
                <span style="margin-right: 10px;">
                    <el-icon>
                        <calendar style="vertical-align: middle;" />
                    </el-icon>
                    {{ article.created_at }}
                </span>
                <span v-if="article.cate_name">
                    <el-icon>
                        <collection style="vertical-align: middle;" />
                    </el-icon>
                    {{ article.cate_name }}
                </span>
            </div>
        </div>
    </el-card>
</template>

<script lang='ts'>
    import { Paperclip, Calendar, Collection, } from '@element-plus/icons'
    import { reactive, toRefs, onBeforeMount, onMounted, defineComponent } from 'vue'
    interface DataProps { }

    export default defineComponent({
        name: 'middlelist',
        props: {
            article: {}
        },
        components: {
            Paperclip,
            Calendar,
            Collection,
        },
        setup() {
            // 1.开始创建组件-setup
            const data: DataProps = reactive({

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
<style>
    .middle-list {
        width: 92%;
        margin: auto;
    }

    .uptop {
        padding: 15px;
        margin: 0 0 20px 0;
        font-size: 20px;
        background-color: whitesmoke;
        border-left: 4px solid #f57e42;
        box-sizing: border-box;
        box-shadow: 0 0 1px #d9d9d9;
    }

    .uptop a {
        text-decoration: none;
        color: #c29b2ffa;
    }

    .article-title {
        padding: 0 14px;
        text-decoration: none;
        color: #07aaf5;
        font-size: x-large;
    }

    .article-title:hover {
        color: #e7b40d;
    }

    .article-info {
        font-size: 13px;
        color: #999;
        margin-top: 15px;
        line-height: 12px;
        justify-content: space-between;
        align-items: center;
    }
</style>