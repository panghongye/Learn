// 分类接口

import { request } from "./request";

// 获取分类列表
export async function getList() {
    return request({
        url: '/tags',
        method: 'GET',
    })
}

// 创建分类
export async function create(data) {
    return request({
        url: '/tags',
        method: 'POST',
        data
    })
}

// 更新分类
export async function update(id, data) {
    return request({
        url: `/tags/${id}`,
        method: 'PUT',
        data
    })
}


// 删除分类
export async function remove(id) {
    return request({
        url: `/tags/${id}`,
        method: 'DELETE',
    })
}

