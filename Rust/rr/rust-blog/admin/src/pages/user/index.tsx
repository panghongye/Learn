import React, { useEffect } from 'react';
import {
    Table,
    Button,
    Breadcrumb,
    Card,
    Message,
    Popconfirm,
} from '@arco-design/web-react';
import { useSelector, useDispatch } from 'react-redux';

import {
    UPDATE_LIST,
    UPDATE_LOADING,
} from './redux/actionTypes';
// import useLocale from '../../utils/useLocale';
import { ReducerState } from '../../redux';
import styles from './style/index.module.less';
import { getList, remove } from '../../api/user';



function Categories() {
    // const locale = useLocale();
    const dispatch = useDispatch();

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: 160
        },
        {
            title: '用户名',
            dataIndex: 'username',
            width: 200
        },
        {
            title: '昵称',
            dataIndex: 'nickname',
            width: 200
        },
        {
            title: "操作",
            dataIndex: 'operations',
            render: (_, record) => (
                <div className={styles.operations}>
                    <Popconfirm
                        title='确定删除吗?'
                        onOk={() => onDelete(record)}
                    >
                        <Button type="text" status="danger" size="small">
                            删除
                        </Button>
                    </Popconfirm>

                </div>
            ),
        },
    ];

    const userState = useSelector((state: ReducerState) => state.user);

    const { data, loading } = userState;


    useEffect(() => {
        fetchData();
    }, []);


    async function fetchData() {
        dispatch({ type: UPDATE_LOADING, payload: { loading: true } });
        try {
            const res: any = await getList();
            // console.log(res);
            if (res.data.data != null || res.data.data.length > 0) {
                dispatch({ type: UPDATE_LIST, payload: { data: res.data.data } });
                dispatch({ type: UPDATE_LOADING, payload: { loading: false } });
            }
        } catch (error) {

        }

    }


    const onDelete = async (row) => {
        const res: any = await remove(row.id);
        if (res.code == 200) {
            Message.success('删除成功！');
            fetchData();
        } else {
            Message.error('删除失败，请重试！');
        }

    }

    return (
        <div className={styles.container}>
            <Breadcrumb style={{ marginBottom: 20 }}>
                <Breadcrumb.Item>用户管理</Breadcrumb.Item>
            </Breadcrumb>
            <Card bordered={false}>
                <Table
                    rowKey="id"
                    stripe={true}
                    pagination={false}
                    loading={loading}
                    columns={columns}
                    data={data}
                />
            </Card>
        </div>
    );
}

export default Categories;
