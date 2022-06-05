<!-- 右边栏 -->
<template>
    <!-- 右边搜索、分类栏 -->
    <el-col :span="6" :xs="0" :sm="8" :md="8" :lg="7" :xl="7">
        <div class="right-sidebar">
            <!-- 搜索表单 -->
            <el-form :inline="true" size="mini">
                <el-form-item>
                    <el-input clearable placeholder="关键字" v-model="searchWord">
                        <template #prefix>
                            <el-icon class="el-input__icon">
                                <search />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchArticle">搜索</el-button>
                </el-form-item>
            </el-form>

            <!-- 分类 -->
            <el-card shadow="always" class="elcard" v-if="cateList">
                <template #header>
                    <div class="card-header">
                        <h4 class="card-title">分类</h4>
                    </div>
                </template>
                <div class="card-content">
                    <div class="card-content-info" v-for="cate in cateList" :key="cate.id">
                        <el-icon :size="16">
                            <collection class="card-content-icon" />
                        </el-icon>
                        <a :href="`/category/${cate.id}/artlist`" class="card-content-link">
                            {{ cate.name }}
                            <span>({{ cate.blog_count }})</span>
                        </a>
                    </div>
                </div>
            </el-card>

            <!-- 热门文章 -->
            <el-card shadow="always" class="elcard" v-if="hotPostList">
                <template #header>
                    <div class="card-header">
                        <h4 class="card-title">热门文章</h4>
                    </div>
                </template>
                <div class="card-content">
                    <div class="card-content-info" v-for="hotPost in hotPostList" :key="hotPost.id">
                        <el-icon :size="16">
                            <document class="card-content-icon" />
                        </el-icon>
                        <a :href="`/article/${hotPost.id}`" class="card-content-link">{{ hotPost.title }}</a>
                    </div>
                </div>
            </el-card>

            <!-- 标签云 -->
            <el-card shadow="always" class="elcard" v-if="tagList">
                <template #header>
                    <div class="card-header">
                        <h4 class="card-title">标签云</h4>
                    </div>
                </template>
                <div class="card-content">
                    <template v-for="tag in tagList" :key="tag.id">
                        <el-link :href="`/tag/${tag.id}/artlist`" type="success" class="taglink" v-if="tag.id % 3 == 0"
                            style="font-size: 16px;">{{ tag.name }}</el-link>
                        <el-link :href="`/tag/${tag.id}/artlist`" type="warning" class="taglink"
                            v-else-if="tag.id % 3 == 1" style="font-size: 16px;">{{ tag.name }}</el-link>
                        <el-link :href="`/tag/${tag.id}/artlist`" type="danger" class="taglink"
                            v-else-if="tag.id % 3 == 2" style="font-size: 16px;">{{ tag.name }}</el-link>
                        <el-link :href="`/tag/${tag.id}/artlist`" type="primary" class="taglink" v-else
                            style="font-size: 16px;">{{ tag.name }}</el-link>
                    </template>

                    <!-- <el-link href="https://element.eleme.io" type="primary" class="taglink">primary
                    </el-link>
                    <el-link href="https://element.eleme.io" type="success" class="taglink">success
                    </el-link>
                    <el-link href="https://element.eleme.io" type="warning" class="taglink">warning
                    </el-link>
                    <el-link href="https://element.eleme.io" type="danger" class="taglink">danger
                    </el-link>
                    <el-link href="https://element.eleme.io" type="info" class="taglink">info
                    </el-link>
                    <el-link href="https://element.eleme.io" type="warning" class="taglink">warning
                    </el-link>
                    <el-link href="https://element.eleme.io" type="danger" class="taglink">danger
                    </el-link>
                    <el-link href="https://element.eleme.io" type="info" class="taglink">info
                    </el-link>-->
                </div>
            </el-card>
        </div>
    </el-col>
</template>

<script lang='ts'>
    import { Search, Collection, Document, } from '@element-plus/icons'
    import { defineComponent, toRefs, reactive, onMounted, computed, ref } from 'vue';
    import { useRouter } from 'vue-router';

    interface DataProps {
        searchWord: any,
    }

    export default defineComponent({
        name: 'Home',
        props: {
            cateList: [],
            hotPostList: [],
            tagList: [],
        },
        components: {
            Search,
            Collection,
            Document,
        },
        setup() {
            const router = useRouter();

            // 1.开始创建组件-setup
            const data: DataProps = reactive({
                searchWord: "",
            });

            // 路由跳转
            function searchArticle() {
                router.push(`/search/${data.searchWord}`);
            }

            const refData = toRefs(data);
            return {
                ...refData,
                searchArticle
            }

        }
    });
</script>

<style>
    .right-sidebar .elcard {
        width: 87%;
        margin-bottom: 20px;
    }

    .right-sidebar .card-title {
        margin: 5px 0;
    }

    .right-sidebar .card-content {
        margin-bottom: 18px;
        font-size: 14px;
    }

    .right-sidebar .card-content-info {
        margin: 0px 0px 15px 5px;
        font-size: 16px;
    }

    .right-sidebar .card-content-icon {
        vertical-align: middle;
    }

    .right-sidebar .card-content-link {
        margin-left: 6px;
        color: #4c4c4c;
        text-decoration: none;
    }

    .right-sidebar .card-content-link:hover {
        color: #2dade7;
    }

    .right-sidebar .taglink {
        padding: 0 10px 10px 0;
    }
</style>