// 路由表

import React from 'react';
import { IconGift, IconStorage, IconTags, IconUser, IconBook } from '@arco-design/web-react/icon';

export const defaultRoute = 'welcome';

// 路由配置
export const routes = [
    {
        name: 'menu.welcome',
        key: 'welcome',
        icon: <IconGift />,
        componentPath: 'welcome',
    },
    {
        name: '文章管理',
        key: 'articles',
        icon: <IconBook />,
        componentPath: 'articles',
    },
    {
        name: '编辑文章',
        key: 'articles/edit/:id',
        icon: <IconBook />,
        componentPath: 'articles/edit',
        hide: true,
    },
    {
        name: '写文章',
        key: 'articles/edit',
        icon: <IconBook />,
        componentPath: 'articles/edit',
        hide: true,
    },
    // 分类页路由
    {
        name: 'menu.categories',
        key: 'categories',
        icon: <IconStorage />,
        componentPath: 'categories',
    },
    // 标签页路由
    {
        name: '标签管理',
        key: 'tags',
        icon: <IconTags />,
        componentPath: 'tags',
    },
    {
        name: '用户管理',
        key: 'user',
        icon: <IconUser />,
        componentPath: 'user',
    },
];
