// import Mock from 'mockjs';
// import qs from 'query-string';
// import setupMock from '../../utils/setupMock';

// const Random = Mock.Random;

// const data = Mock.mock({
//     'list|55': [
//         {
//             'id|8': /[0-9]/,
//             'name|4-8': /[\u4e00-\u9fa5]/,
//             'article_count|1-4': /[1-9]/,
//             created_at: Random.datetime(),
//             updated_at: Random.datetime(),
//         },
//     ],
// });

// setupMock({
//     setup() {
//         Mock.mock(new RegExp('/api/categories'), (params) => {
//             // console.log(params);
//             switch (params.type) {
//                 case 'PUT':
//                     // const body = JSON.parse(params.body);
//                     // const index = data.list.findIndex(item => item.id === body.id);
//                     // data.list[index] = { ...data.list[index], ...body };
//                     return {
//                         "msg": "分类修改成功",
//                         "data": null,
//                         "code": 200
//                     }

//                 case 'POST':
//                     const { name } = JSON.parse(params.body);
//                     const returnData = Mock.mock({
//                         'id|8': /[0-9]/,
//                         name,
//                         article_count: 0,
//                         created_at: Random.datetime(),
//                         updated_at: Random.datetime(),
//                     })
//                     // 插入到mock虚拟集合
//                     data.list.unshift(returnData);
//                     return {
//                         "code": 200,
//                         "msg": "分类添加成功",
//                         data: returnData
//                     }
//                 case 'GET':
//                 default:
//                     break;
//             }

//             const { page = 1, perPage = 10 } = qs.parseUrl(params.url).query;
//             const p = page as number;
//             const ps = perPage as number;

//             return {
//                 data: data.list.slice((p - 1) * ps, p * ps),
//                 total: 55,
//             };
//         });
//     },
// });
