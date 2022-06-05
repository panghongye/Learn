import request from '@/utils/request'


// 文章列表
export function fetchPostList(page: any, perPage: any) {
    return request({
        url: `/articles?page=${page}&perPage=${perPage}`,
        method: 'get',
    });
}

// 文章详情
export function fetchPostDetail(id: number | string) {
    return request({
        url: `/article/${id}`,
        method: 'get',
    });
}


// 最热文章
export function fetchHotPosts() {
    return request({
        url: "/article/hot",
        method: 'get',
    });
}

// 分类列表
export function fetchCategories() {
    return request({
        url: '/categories',
        method: 'get',
    });
}



// 分类详情
export function fetchCategoryDetail(id: number | string) {
    return request({
        url: `/category/${id}`,
        method: 'get',
    });
}

// 分类下文章列表
export function fetchArtListByCid(cid: number | string) {
    return request({
        url: `/category/${cid}/artlist`,
        method: 'get',
    });
}

// 标签列表
export function fetchTags() {
    return request({
        url: '/tags',
        method: 'get',
    });
}

// 标签详情
export function fetchTagDetail(id: number | string) {
    return request({
        url: `/tag/${id}`,
        method: 'get',
    });
}

// 标签下文章列表
export function fetchArtListByTid(tid: number | string) {
    return request({
        url: `/tag/${tid}/artlist`,
        method: 'get',
    });
}


// 搜索文章
export function searchArticle(word: string) {
    return request({
        url: `/article/search/${word}`,
        method: 'get',
    });
}