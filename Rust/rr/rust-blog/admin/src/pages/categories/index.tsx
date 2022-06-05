import React, { useEffect, useState } from 'react';
import {
    Table,
    Button,
    Input,
    Breadcrumb,
    Card,
    Form,
    Modal,
    Message,
    Popconfirm
} from '@arco-design/web-react';
import { useSelector, useDispatch } from 'react-redux';
import {
    TOGGLE_CONFIRM_LOADING,
    TOGGLE_VISIBLE,
    // UPDATE_FORM_PARAMS,
    UPDATE_LIST,
    UPDATE_LOADING,
    // UPDATE_PAGINATION,
} from './redux/actionTypes';
// import useLocale from '../../utils/useLocale';
import { ReducerState } from '../../redux';
import { EditableRow, EditableCell } from './edit';
import { getList, create, update, remove } from '../../api/categories';
import moment from 'moment';
import styles from './style/index.module.less';

const FormItem = Form.Item;

// 添加表单布局
const formItemLayout = {
    labelCol: {
        span: 5,
    },
    wrapperCol: {
        span: 19,
    },
};

function Categories() {
    // const locale = useLocale();
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [title, setTitle] = useState('添加分类');



    // 表头列配置
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: '分类名称',
            dataIndex: 'name',
            editable: true,
        },
        {
            title: '文章数量',
            dataIndex: 'blog_count',
        },
        {
            title: '创建时间',
            dataIndex: 'created_at',
        },
        {
            title: '更新时间',
            dataIndex: 'updated_at',
        },
        {
            title: '操作',
            dataIndex: 'operations',
            render: (_, record) => (
                <div className={styles.operations}>
                    <Button onClick={() => onUpdate(record)} type="text" size="small">
                        修改
                    </Button>
                    <Popconfirm
                        title='确定删除吗?'
                        onOk={() => onDelete(record.id)}
                        onCancel={() => {
                            Message.info({ content: '取消操作' });
                        }}
                    >
                        <Button type="text" status="danger" size="small">
                            删除
                        </Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    const categoriesState = useSelector((state: ReducerState) => state.categories);

    const { data, loading, visible, confirmLoading } = categoriesState;


    useEffect(() => {
        fetchData();
    }, []);

    // 获取数据方法
    async function fetchData() {
        dispatch({ type: UPDATE_LOADING, payload: { loading: true } });
        try {
            // 调用axios请求
            const res: any = await getList();
            // console.log("categories的res：", res);

            // 更新store
            if (res.data.data != null || res.data.data.length > 0) {
                // 时间戳转日期时间
                res.data.data.map((r) => {
                    r.created_at = moment.unix(r.created_at).format("YYYY年MM月DD日 HH:mm:ss");
                    r.updated_at = moment.unix(r.updated_at).format("YYYY年MM月DD日 HH:mm:ss");
                });
                dispatch({ type: UPDATE_LIST, payload: { data: res.data.data } });
                // dispatch({
                //     type: UPDATE_PAGINATION,
                //     payload: { pagination: { ...pagination, current, perPage, total: res.data.total } },
                // });
                dispatch({ type: UPDATE_LOADING, payload: { loading: false } });
                // dispatch({ type: UPDATE_FORM_PARAMS, payload: { params } });

            } else {

            }

        } catch (error) {
            console.log(error);
        }

    }

    // 更改表格显示
    // function onChangeTable() {
    //     fetchData();
    // }

    // // 搜索方法
    // function onSearch(name) {

    // }

    // 添加按钮点击事件
    const onAdd = () => {
        // 表单可视true
        dispatch({
            type: TOGGLE_VISIBLE,
            payload: {
                visible: true
            }
        });
    }

    // Modal弹出表单确认事件
    const onOk = async () => {
        // 表单验证
        await form.validate();
        // 获取表单填写的内容
        const data = form.getFields();   // 例{name: '123'}
        // console.log(data);

        // 判断是否为修改分类
        if (data.id) {  // 是修改操作
            // 按钮转圈圈
            dispatch({
                type: TOGGLE_CONFIRM_LOADING,
                payload: {
                    confirmloading: true
                }
            });
            // 调用axios请求
            const res: any = await update(data.id, { name: data.name });
            // console.log('update res: ', res);
            if (!res) { Message.error('修改失败，请重试！'); }
            if (res.data.code === 200) {
                Message.success('修改分类成功');
                // 停止按钮转圈圈
                dispatch({
                    type: TOGGLE_CONFIRM_LOADING,
                    payload: {
                        confirmloading: false
                    }
                });
                // 调用onCancel清空和隐藏表单
                onCancel();
                // 刷新列表
                fetchData();
            } else {
                Message.error('修改失败，请重试！');
            }
        } else {    // 是添加操作
            // 按钮转圈圈
            dispatch({
                type: TOGGLE_CONFIRM_LOADING,
                payload: {
                    confirmloading: true
                }
            });

            // 调用axios请求创建分类
            const res: any = await create(data);
            // console.log("add res: ", res);
            if (!res) { Message.error('添加失败，请重试！'); }
            if (res && res.data.code === 200) {
                // 停止按钮转圈圈
                dispatch({
                    type: TOGGLE_CONFIRM_LOADING,
                    payload: {
                        confirmloading: false
                    }
                });
                // 调用onCancel清空和隐藏表单
                onCancel();
                // 刷新列表
                fetchData();
                // 消息提示
                Message.success('添加分类成功');
            } else {
                Message.error('添加失败，请重试！');
            }
        }
    }

    // 添加分类的表单取消事件
    const onCancel = () => {
        // 清空表单
        form.resetFields();
        // 隐藏表单
        dispatch({
            type: TOGGLE_VISIBLE,
            payload: {
                visible: false
            }
        });
    }

    // 表格行完成编辑
    const onHandleSave = async (row) => {
        // console.log('row: ', row);
        const res: any = await update(row.id, { name: row.name });
        // console.log('update res: ', res);
        if (!res) { Message.error('修改失败，请重试！'); }
        if (res.data.code === 200) {
            Message.success(res.data.msg);
            // 重新获取列表数据
            fetchData();
        } else {
            Message.error('修改失败，请重试！');
        }
    }

    // 点击修改按钮事件
    const onUpdate = (row) => {
        // 弹出修改表单
        dispatch({
            type: TOGGLE_VISIBLE,
            payload: {
                visible: true
            }
        });
        // 输入框显示原来的数据
        form.setFieldsValue(row);
        setTitle('修改分类');
    }


    // 确认删除
    const onDelete = async (id) => {
        const res: any = await remove(id);
        // console.log('remove res: ', res);
        if (!res) { Message.error('删除失败，请重试！'); }
        if (res.data.code === 200) {
            Message.success(res.data.msg);
            // 重新获取列表数据
            fetchData();
        } else {
            Message.error('删除失败，请重试！');
        }
    }

    return (
        <div className={styles.container}>
            <Breadcrumb style={{ marginBottom: 20 }}>
                <Breadcrumb.Item>分类管理</Breadcrumb.Item>
            </Breadcrumb>
            <Card bordered={false}>
                <div className={styles.toolbar}>
                    <div>
                        <Button onClick={onAdd} type="primary">添加分类</Button>
                    </div>
                    {/* <div>
                        <DatePicker.RangePicker style={{ marginRight: 8 }} onChange={onDateChange} />
                        <Input.Search
                            style={{ width: 300 }}
                            searchButton
                            placeholder='请输入分类名称'
                        onSearch={onSearch}
                        />
                    </div> */}
                </div>
                <Table
                    stripe={true}
                    rowKey="id"
                    loading={loading}
                    pagination={false}
                    // onChange={onChangeTable}
                    // pagination={pagination}
                    // columns={columns}
                    columns={columns.map((column) =>
                        column.editable
                            ? {
                                ...column,
                                onCell: () => ({
                                    onHandleSave,
                                }),
                            }
                            : column
                    )}
                    data={data}
                    components={{
                        body: {
                            row: EditableRow,
                            cell: EditableCell,
                        },
                    }}
                    className={styles['table-editable-cell']}
                />

                <Modal
                    title={title}
                    visible={visible}
                    onOk={onOk}
                    confirmLoading={confirmLoading}
                    onCancel={onCancel}
                >
                    <Form
                        {...formItemLayout}
                        form={form}
                    >
                        <FormItem label='分类名称' field='name' rules={[{ required: true, message: '请输入分类名称' }]}>
                            <Input placeholder='输入分类名称' />
                        </FormItem>

                    </Form>
                </Modal>
            </Card>
        </div>
    );
}

export default Categories;
