import { request } from './request';

// 获取文章列表
export async function getList(params) {
    return request({
        url: '/articles',
        params,
    });
}

// 新增文章
export async function create(data) {
    return request({
        url: '/article',
        method: 'post',
        data,
    });
}

// 更新文章
export async function update(data) {
    return request({
        url: `/article/${data.id}`,
        method: 'put',
        data,
    });
}

// 查询当前编辑的文章详情
export async function queryArticles(id) {
    return request({
        url: `/article/edit/${id}`,
        method: 'get',
    });
}

// 删除文章
export async function remove(id) {
    return request({
        url: `/article/${id}`,
        method: 'delete',
    });
}

// 搜索文章
export async function searchArticles(params) {
    return request({
        url: '/article/search',
        method: 'get',
        params,
    });
}


// export async function updateStatus(data) {
//     return request({
//         url: '/articles/status',
//         method: 'put',
//         data,
//     });
// }

// export async function updatePublishStatus(data) {
//     return request({
//         url: '/articles/publishStatus',
//         method: 'put',
//         data,
//     });
// }

// export async function updateCollectStatus(data) {
//     return request({
//         url: '/articles/collectStatus',
//         method: 'put',
//         data,
//     });
// }
