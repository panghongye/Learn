import { request } from './request';

export async function getList() {
    return request({
        url: '/users',
        method: 'GET',
    });
}

export async function remove(id) {
    return request({
        url: `/user/${id}`,
        method: 'DELETE',
    });
}

