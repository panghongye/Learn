import React, { useEffect, useState } from 'react';
import {
    Table,
    Button,
    Input,
    Card,
    Form,
    Message,
    Popconfirm,
    Select,
    // Tag,
    Breadcrumb,
    // DatePicker,
    Grid,
    // Radio,
} from '@arco-design/web-react';
import { useSelector, useDispatch } from 'react-redux';
import history from '../../history';
import moment from 'moment';

import {
    // TOGGLE_VISIBLE,
    UPDATE_FORM_PARAMS,
    UPDATE_LIST,
    UPDATE_LOADING,
    UPDATE_PAGINATION,
} from './redux/actionTypes';
import { ReducerState } from '../../redux';
import styles from './style/index.module.less';
import { getList, remove, searchArticles } from '../../api/articles';
import { getList as getTagsList } from '../../api/tags';
import { getList as getCategoriesList } from '../../api/categories';

const Row = Grid.Row;
const Col = Grid.Col;

function Articles() {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const articlesState = useSelector((state: ReducerState) => state.articles);
    const { data, pagination, loading } = articlesState;

    // const [tagsArr, setTagsArr] = useState([]);
    const [, setTagsArr] = useState([]);
    const [categoriesArr, setCategoriesArr] = useState([]);

    // 获取标签数据
    const getTags = async () => {
        const res: any = await getTagsList();
        const list = res.data.data?.map((item) => {
            item.key = item.id;
            item.value = item.name;
            return item;
        });
        setTagsArr(list);
    };

    // 获取分类数据
    const getCategories = async () => {
        const res: any = await getCategoriesList();
        const list = res.data.data?.map((item) => {
            item.key = item.id;
            item.value = item.name;
            return item;
        });
        setCategoriesArr(list);
    };

    useEffect(() => {
        getTags();
        getCategories();
    }, []);

    useEffect(() => {
        fetchData();
    }, []);

    // 发布状态修改
    // const onChangePublishStatus = async (record) => {
    //     const postData = {
    //         id: record.id,
    //         publishStatus: record.publishStatus === 1 ? 2 : 1,
    //     };
    //     const res: any = await updatePublishStatus(postData);
    //     if (res.code === 0) {
    //         Message.success(res.msg);
    //         fetchData();
    //     } else {
    //         Message.error('文章状态修改失败，请重试！');
    //     }
    // };

    // 查看按钮事件
    // const onView = (record) => { };

    // // 文章状态修改
    // const onStatusChange = async (checked, record) => {
    //     const postData = {
    //         id: record.id,
    //         status: checked ? 1 : 2,
    //     };
    //     const res: any = await updateStatus(postData);
    //     if (res.code === 0) {
    //         Message.success(res.msg);
    //         fetchData();
    //     } else {
    //         Message.error('文章状态修改失败，请重试！');
    //     }
    // };



    // 表格列配置
    const columns = [
        {
            title: '文章标题',
            dataIndex: 'title',
        },
        {
            title: '简介',
            dataIndex: 'description',
        },
        // {
        //     title: '分类',
        //     dataIndex: 'categories',
        // },
        // {
        //     title: '标签',
        //     dataIndex: 'tags',
        //     render: (_, record) => {
        //         let result = [];
        //         for (let i = 0; i < record.tags.length; i += 3) {
        //             result.push(record.tags.slice(i, i + 3)); // i=0 0-3 i=3 3-6
        //         }
        //         return result.map((item, index) => {
        //             return (
        //                 <div style={{ marginBottom: 10 }} key={index}>
        //                     {item.map((sub) => (
        //                         <Tag style={{ marginRight: 10 }} key={sub}>
        //                             {sub}
        //                         </Tag>
        //                     ))}
        //                 </div>
        //             );
        //         });
        //     },
        // },
        // {
        //     title: '文章状态',
        //     dataIndex: 'status',
        //     render: (_, record: any) => {
        //         return (
        //             <Switch
        //                 checkedText="启用"
        //                 uncheckedText="停用"
        //                 checked={record.status === 1}
        //                 onChange={(checked) => onStatusChange(checked, record)}
        //             />
        //         );
        //     },
        // },
        // {
        //     title: '发布状态',
        //     dataIndex: 'publishStatus',
        //     render: (_, record) => {
        //         const texts = {
        //             1: '已发布',
        //             2: '未发布',
        //         };
        //         const enums = {
        //             1: 'success',
        //             2: 'error',
        //         };
        //         return <Badge status={enums[record.publishStatus]} text={texts[record.publishStatus]} />;
        //     },
        // },

        {
            title: '创建时间',
            dataIndex: 'created_at',
            render: (_, record) => {
                return moment.unix(record.created_at).format("YYYY年MM月DD日 HH:mm:ss");
            },
        },
        {
            title: '修改时间',
            dataIndex: 'updated_at',
            render: (_, record) => {
                return record.updated_at
                    ? moment.unix(record.updated_at).format("YYYY年MM月DD日 HH:mm:ss")
                    : '-';
            },
        },

        {
            title: '操作',
            dataIndex: 'operations',
            render: (_, record) => (
                <div className={styles.operations}>
                    {/* <Button onClick={() => onChangePublishStatus(record)} type="text" size="small">
                        {record.publishStatus === 1 ? '下线' : '发布'}
                    </Button> */}
                    {/* <Button onClick={() => onView(record)} type="text" size="small">
                        查看
                    </Button> */}
                    <Button onClick={() => onUpdate(record)} type="text" size="small">
                        修改
                    </Button>
                    <Popconfirm title="确定删除吗?" onOk={() => onDelete(record)}>
                        <Button type="text" status="danger" size="small">
                            删除
                        </Button>
                    </Popconfirm>
                    {/* {record.publishStatus === 2 && (
                        <>
                        </>
                    )} */}
                </div>
            ),
        },
    ];


    // 获取表格展示数据
    async function fetchData(current = 1, perPage = 20) {
        dispatch({ type: UPDATE_LOADING, payload: { loading: true } });
        try {
            const getParames = {
                page: current,
                perPage: perPage,
            };
            // console.log(getParames);
            const res: any = await getList(getParames);
            // console.log(res);
            if (res && res.data.data != null) {
                dispatch({ type: UPDATE_LIST, payload: { data: res.data.data } });
                dispatch({
                    type: UPDATE_PAGINATION,
                    payload: { pagination: { ...pagination, current, perPage, total: res.data.total } },
                });
                dispatch({ type: UPDATE_LOADING, payload: { loading: false } });
                dispatch({ type: UPDATE_FORM_PARAMS, payload: { perPage } });
            }
        } catch (error) { }
    }

    // 表格分页改变事件
    function onChangeTable(pagination) {
        const { current, pageSize } = pagination;
        fetchData(current, pageSize);
    }

    // 重置表单
    const onReset = () => {
        form.resetFields();
        fetchData();
    };

    // 搜索按钮事件
    const onSearch = async () => {
        const values = await form.getFields();
        if (!values.title) {
            values.title = "";
        }
        if (!values.category) {
            values.category = 0;
        }
        // if (!values.tag) {
        //     values.tag = 0;
        // }
        // console.log(values);
        const res = await searchArticles(values);
        if (!res) {
            Message.error("出现错误");
            return;
        }
        dispatch({ type: UPDATE_LIST, payload: { data: res.data.data } });
        dispatch({
            type: UPDATE_PAGINATION,
            payload: { pagination: { ...pagination, current: 1, perPage: 1000, total: res.data.data.length } },
        });
        dispatch({ type: UPDATE_LOADING, payload: { loading: false } });
        dispatch({ type: UPDATE_FORM_PARAMS, payload: { perPage: 1000 } });
    };

    // 点击添加文章按钮事件
    const onAdd = () => {
        history.push(`/articles/edit`)
    };

    // 修改文章按钮事件
    const onUpdate = (row) => {
        history.push(`/articles/edit/${row.id}`);
        // history.push(`/articles/edit?id=${row.id}`);
    };

    // 删除文章按钮事件
    const onDelete = async (row) => {
        const res: any = await remove(row.id);
        if (res && res.data.code == 200) {
            Message.success('删除成功');
            fetchData();
        } else {
            Message.error('删除失败，请重试！');
        }
    };

    // const handleUpdateCollectStatus = async (isCollect) => {
    //     const res: any = await updateCollectStatus({
    //         isCollect
    //     });
    //     if (res.code === 0) {
    //         Message.success(res.msg);
    //         fetchData();
    //     } else {
    //         Message.error('一键操作失败，请重试！');
    //     }
    // }

    // 表单布局
    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };

    // // 标签选择器选择事件
    // const tagOnChange = () => {
    //     form.resetFields(["category"]);
    // }

    // // 分类选择器选择事件
    // const categoryOnChange = () => {
    //     form.resetFields(["tag"]);
    // }


    return (
        <div className={styles.container}>
            <Breadcrumb style={{ marginBottom: 20 }}>
                <Breadcrumb.Item>文章管理</Breadcrumb.Item>
            </Breadcrumb>
            <Card bordered={false}>
                <div className={styles.toolbar}>
                    <div>
                        <Button onClick={onAdd} type="primary">
                            添加文章
                        </Button>

                        {/* <Radio.Group onChange={handleUpdateCollectStatus} type="button" name="lang" style={{ marginLeft: 20 }}>
                            <Radio value={true}>一键开启收藏</Radio>
                            <Radio value={false}>一键关闭收藏</Radio>
                        </Radio.Group> */}
                    </div>
                </div>

                <Form
                    form={form}
                    {...layout}
                    style={{ marginBottom: 20 }}
                    layout="horizontal"
                >
                    <Row>
                        <Col span={6}>
                            <Form.Item field="title" label="文章标题">
                                <Input placeholder="请输入文章标题" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item field="category" label="分类">
                                <Select  /* onChange={() => categoryOnChange()} */ placeholder="请选择分类">
                                    {[
                                        // {
                                        //     key: '',
                                        //     value: '全部',
                                        // },
                                        ...categoriesArr,
                                    ].map((item) => (
                                        <Select.Option key={item.key} value={item.key}>
                                            {item.value}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        {/* <Col span={6}>
                            <Form.Item field="tag" label="标签">
                                <Select onChange={() => tagOnChange()} placeholder="请选择标签">
                                    {tagsArr.map((item) => (
                                        <Select.Option key={item.key} value={item.key}>
                                            {item.value}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col> */}
                        {/* <Col span={6}>
                            <Form.Item field="status" label="文章状态">
                                <Select placeholder="请选择文章状态">
                                    {[
                                        {
                                            key: '0',
                                            value: '全部',
                                        },
                                        ...statusOptions,
                                    ].map((item) => (
                                        <Select.Option key={item.key} value={item.key}>
                                            {item.value}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col> */}
                    </Row>
                    <Row>
                        {/* <Col span={6}>
                            <Form.Item field="publishStatus" label="发布状态">
                                <Select placeholder="请选择文章发布状态" defaultValue="">
                                    {[
                                        {
                                            key: '0',
                                            value: '全部',
                                        },
                                        ...publishStatusOptions,
                                    ].map((item) => (
                                        <Select.Option key={item.key} value={item.key}>
                                            {item.value}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item field="createTime" label="创建时间">
                                <DatePicker.RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item field="updateTime" label="修改时间">
                                <DatePicker.RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                            </Form.Item>
                        </Col> */}
                        <Col span={5} offset={1}>
                            <Form.Item>
                                <Button onClick={onReset}>重置</Button>
                                <Button onClick={onSearch} style={{ marginLeft: 20 }} type="primary">
                                    搜索
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>

                <Table
                    rowKey="id"
                    loading={loading}
                    onChange={onChangeTable}
                    pagination={pagination}
                    columns={columns}
                    data={data}
                />
            </Card>
        </div>
    );
}

export default Articles;
