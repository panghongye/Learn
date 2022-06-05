import { createRouter, createWebHashHistory, createWebHistory, createMemoryHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '',
                name: 'index',
                component: () => import('../views/Index.vue'),
                meta: {
                    title: '主页',
                    keepAlive: true,
                }
            },
            // {
            //     path: '/category/:id',
            //     component: () => import('../views/Category.vue'),
            //     meta: {
            //         title: '分类',
            //     },
            //     props: true,
            // },
            {
                path: '/category/:cid/artlist',
                component: () => import('../views/Category.vue'),
                meta: {
                    title: '分类',
                    keepAlive: true,
                },
                props: true,
            },
            // {
            //     path: '/tag/:id',
            //     component: () => import('../views/Tag.vue'),
            //     meta: {
            //         title: '标签',
            //     },
            //     props: true,
            // },
            {
                path: '/tag/:tid/artlist',
                component: () => import('../views/Tag.vue'),
                meta: {
                    title: '标签',
                    keepAlive: true,
                },
                props: true,
            },
            {
                path: '/article/:id',
                name: 'Detail',
                component: () => import('../views/Detail.vue'),
                meta: {
                    title: '文章详情',
                    keepAlive: true,
                },
                props: true,

            },
            {
                path: '/about',
                name: 'About',
                component: () => import('../views/About.vue'),
                meta: {
                    title: '关于',
                    keepAlive: true,
                }
            },
            {
                path: '/search/:word',
                name: 'Search',
                component: () => import('../views/Search.vue'),
                meta: {
                    title: '搜索',
                }
            }
        ]
    }

]

const router = createRouter({
    // history: createWebHashHistory(),
    history: createMemoryHistory(),
    // history: createWebHistory(),
    routes,
})

// 处理网页标题
router.beforeEach((to, from, next) => {
    var title: string = String(to.meta.title);
    if (title) {
        document.title = to.meta.title ? title : '加载中';
        next();
    }
});

export default router
