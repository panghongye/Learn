// 文章发布页


import React, { useEffect, useRef, useState } from 'react';
import {
    Input,
    Breadcrumb,
    Card,
    Form,
    Grid,
    // Link,
    // Switch,
    Message,
    Select,
    // InputNumber,
} from '@arco-design/web-react';
const Option = Select.Option;
import styles from './style/index.module.less';
import Save from '../../components/Save';
import { queryArticles, create, update } from '../../api/articles';
import { getList as getCategoriesList } from '../../api/categories';
import { getList as getTagsList } from '../../api/tags';
import Editor from 'for-editor';
const Row = Grid.Row;
const Col = Grid.Col;
import history from '../../history';
// import { useLocation } from 'react-router-dom';
const layout = {
    labelCol: {
        span: 2,
    },
    wrapperCol: {
        span: 22,
    },
};

const formItemLayout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 20,
    },
};

// const formItemLayout2 = {
//     labelCol: {
//         span: 10,
//     },
//     wrapperCol: {
//         span: 14,
//     },
// };

const Edit = (props) => {
    const [form] = Form.useForm();
    const [categoriesArr, setCategoriesArr] = useState([]);
    const [tagsArr, setTagsArr] = useState([]);
    const editorRef = useRef<any>();

    // const { search } = useLocation();
    // let id = '';
    // if (search) {
    //     id = search.split('id=')[1];
    // }

    // 获取路由上的文章id
    let id = props.match.params.id;
    // console.log("文章id为： ", id);


    // 页面加载完成后获取数据
    const loadData = async () => {
        if (!id) return;
        // 调用axios查询文章详情
        const res: any = await queryArticles(id);
        const art = res.data.data;
        if (!art) return;
        // console.log('data', data);

        // tags字符串转number数组
        // console.log(art.tags);
        if (art.tags) {
            if (art.tags.indexOf(",") > 0) {
                art.tags = art.tags.split(",").map(Number);
                // console.log(art.tags);
            } else {
                let x = parseInt(art.tags);
                art.tags = [x,];
            }
        }
        // console.log(art);
        // 文章详情内容放入表单
        form.setFieldsValue(art);
    };

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
        loadData();
    }, []);


    // 保存按钮事件
    // const onSave = async (publishStatus) => {
    //     await form.validate();
    //     const values = await form.getFields();
    //     if (id) {
    //         values.id = id;
    //     }
    //     let func = id ? update : create;
    //     const res: any = await func(values);
    //     if (res.data.data) {
    //         history.goBack();
    //         Message.success('成功');
    //     } else {
    //         Message.error('修改失败，请重试');
    //     }
    // };

    // 发布或更新文章
    const onPublish = async () => {
        await form.validate();
        const values = await form.getFields();
        // console.log(values);
        if (id) {
            values.id = id;
        }
        // 定义func变量暂存update/create方法
        let func = id ? update : create;
        // 调用axios新增或更新文章
        const res: any = await func(values);
        // console.log(res);
        if (res && res.data.code == 200) {
            history.goBack();
            Message.success('操作成功');
        } else {
            Message.error('操作失败，请重试');
        }
    };

    // const addImg = async (file) => {
    //     const formData = new FormData();
    //     formData.append('file', file);
    //     // const res = await upload(formData);
    //     const res = [
    //         {
    //             hash: 'FgOETQ8j4Zpygl6WWpZQ_75N20Sf',
    //             key: '3a4e66a577cde9b8e8c5550dc51aaaba.png',
    //             url: 'http://img.nevergiveupt.top/3a4e66a577cde9b8e8c5550dc51aaaba.png',
    //         },
    //     ];
    //     if (res) {
    //         editorRef.current.$img2Url(file.name, res[0].url);
    //     }
    // };


    return (
        <>
            <Save showBack onPublish={onPublish} />

            <div className={styles.container}>
                <Breadcrumb style={{ marginBottom: 20 }}>
                    <Breadcrumb.Item>编辑文章</Breadcrumb.Item>
                </Breadcrumb>
                <Card hoverable>
                    <Form
                        {...layout}
                        form={form}

                    >
                        <Form.Item
                            label="文章标题"
                            field="title"
                            rules={[{ required: true, message: '请输入文章标题' }]}
                        >
                            <Input placeholder="请输入文章标题" />
                        </Form.Item>

                        <Form.Item
                            label="文章简介"
                            field="description"
                            rules={[
                                { required: true, message: '请输入文章简介' },
                                {
                                    maxLength: 1024,
                                    message: '不能超过1024个字符',
                                },
                            ]}
                        >
                            <Input.TextArea rows={5} />
                        </Form.Item>

                        <Row>
                            <Col span={12}>
                                {/* <Form.Item
                                    label="文章封面"
                                    field="cover"
                                    rules={[{ required: true, message: '请添加文章封面' }]}
                                    {...formItemLayout}
                                >
                                </Form.Item> */}

                                <Form.Item
                                    field="cate_id"
                                    label="选个分类"
                                    {...formItemLayout}
                                    rules={[{ required: true, message: '请选择分类' }]}
                                >
                                    <Select placeholder="请选择分类">
                                        {categoriesArr.map((item) => (
                                            // <Option key={item.key} value={item.value}>
                                            //     {item.value}
                                            // </Option>
                                            // 传所选分类的id到后端
                                            <Option key={item.key} value={item.key}>
                                                {item.value}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>

                                {/* <Form.Item
                                    field="tags"
                                    label="贴个标签"
                                    {...formItemLayout}
                                    rules={[{ required: true, message: '请选择标签' }]}
                                >
                                    <Select mode="multiple" placeholder="请选择标签">
                                        {tagsArr.map((item) => (
                                            <Select.Option key={item.key} value={item.value}>
                                                {item.value}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item> */}
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    field="tags"
                                    label="选择标签"
                                    {...formItemLayout}
                                    rules={[{ required: true, message: '请选择标签' }]}
                                >
                                    <Select mode="multiple" placeholder="请选择标签">
                                        {tagsArr.map((item) => (
                                            // 此处有坑，多选后得到的key不是tag的id值
                                            // <Option key={item.key} value={item.value}>
                                            //     {item.value}
                                            // </Option>
                                            <Option key={item.key} value={item.key}>
                                                {item.value}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            {/* <Col span={11} offset={1}>
                                <Row>
                                    <Col span={8}>
                                        <Form.Item
                                            {...formItemLayout2}
                                            label="评论"
                                            field="isComment"
                                            triggerPropName="checked"
                                        >
                                            <Switch />
                                        </Form.Item>
                                        <Form.Item
                                            {...formItemLayout2}
                                            label="点赞"
                                            field="isLike"
                                            triggerPropName="checked"
                                        >
                                            <Switch />
                                        </Form.Item>
                                        <Form.Item
                                            {...formItemLayout2}
                                            label="收藏"
                                            field="isCollect"
                                            triggerPropName="checked"
                                        >
                                            <Switch />
                                        </Form.Item>
                                        <Form.Item
                                            {...formItemLayout2}
                                            label="打赏"
                                            field="isReward"
                                            triggerPropName="checked"
                                        >
                                            <Switch />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item
                                            {...formItemLayout2}
                                            label="查看数量"
                                            field="views"
                                            rules={[{ required: true, message: '请输入查看数量' }]}
                                        >
                                            <InputNumber />
                                        </Form.Item>
                                        <Form.Item
                                            {...formItemLayout2}
                                            label="点赞数量"
                                            field="like"
                                            rules={[{ required: true, message: '请输入点赞数量' }]}
                                        >
                                            <InputNumber />
                                        </Form.Item>
                                        <Form.Item
                                            {...formItemLayout2}
                                            label="收藏数量"
                                            field="collect"
                                            rules={[{ required: true, message: '请输入收藏数量' }]}
                                        >
                                            <InputNumber />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Col> */}
                        </Row>

                        <Form.Item
                            wrapperCol={{ span: 24 }}
                            field="content"
                            rules={[{ required: true, message: '请撰写文章' }]}
                        >
                            <Editor
                                ref={(el) => (editorRef.current = el)}
                                height='800px'
                                // addImg={(file) => addImg(file)}
                                placeholder="请撰写文章"
                            />
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </>
    );
};

export default Edit;

