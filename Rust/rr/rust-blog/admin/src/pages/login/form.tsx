// import { Form, Input, Checkbox, Link, Button, Space } from '@arco-design/web-react';
import { Form, Input, Button, Space } from '@arco-design/web-react';
import { FormInstance } from '@arco-design/web-react/es/Form';
import { IconLock, IconUser } from '@arco-design/web-react/icon';
// import React, { useEffect, useRef, useState } from 'react';
import React, { useRef, useState } from 'react';
// import axios from 'axios';
import styles from './style/index.module.less';
import history from '../../history';
import useLocale from '../../utils/useLocale';
import { useDispatch } from 'react-redux';

import { login as adminLogin } from '../../api/login';

export default function LoginForm() {
    const formRef = useRef<FormInstance>();
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    // const [rememberPassword, setRememberPassword] = useState(false); //记住密码用
    const locale = useLocale();
    const dispatch = useDispatch();

    function afterLoginSuccess(params) {
        // 记住密码
        // if (rememberPassword) {
        //     localStorage.setItem('loginParams', JSON.stringify(params));
        // } else {
        //     localStorage.removeItem('loginParams');
        // }

        // 记录登录状态
        localStorage.setItem('token', params.token);    // 存储token
        dispatch({
            type: 'LOGIN',
            payload: params,
        });
        // 跳转首页
        window.location.href = history.createHref({
            pathname: '/',
        });
    }

    async function login(params) {
        setErrorMessage('');
        setLoading(true);

        try {
            const res: any = await adminLogin(params);
            // console.log(res);
            if (res.data.code === 200 && res.data.data != null) {
                afterLoginSuccess(res.data.data);
            } else {
                setErrorMessage(res.data.msg || '登录出错，请重试');
            }
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    function onSubmitClick() {
        formRef.current.validate().then((values) => {
            login(values);
        });
    }

    // // 读取 localStorage，设置初始值
    // useEffect(() => {
    //     const params = localStorage.getItem('loginParams');
    //     const rememberPassword = !!params;
    //     setRememberPassword(rememberPassword);
    //     if (formRef.current && rememberPassword) {
    //         const parseParams = JSON.parse(params);
    //         formRef.current.setFieldsValue(parseParams);
    //     }
    // }, []);

    return (
        <div className={styles['login-form-wrapper']}>
            <div className={styles['login-form-title']}>博客后台管理系统</div>
            <div className={styles['login-form-sub-title']}>登录 博客后台管理系统</div>
            <div className={styles['login-form-error-msg']}>{errorMessage}</div>
            <Form className={styles['login-form']} layout="vertical" ref={formRef}>
                <Form.Item field="username" rules={[
                    { required: true, message: locale['login.p_username'] },
                    { match: /^[A-Za-z0-9_]{5,15}$/, message: locale['login.p_username_pattern'] }
                ]}>
                    <Input prefix={<IconUser />} placeholder={locale['login.p_username']} onPressEnter={onSubmitClick} />
                </Form.Item>
                <Form.Item field="password" rules={[
                    { required: true, message: locale['login.p_password'] },
                    { match: /^[A-Za-z0-9_]{6,20}$/, message: locale['login.p_password_pattern'] }
                ]}>
                    <Input.Password
                        prefix={<IconLock />}
                        placeholder={locale['login.p_password']}
                        onPressEnter={onSubmitClick}
                    />
                </Form.Item>
                <Space size={16} direction="vertical">
                    {/* <div className={styles['login-form-password-actions']}>
                        <Checkbox checked={rememberPassword} onChange={setRememberPassword}>
                            记住密码
                        </Checkbox>
                        <Link>忘记密码？</Link>
                    </div> */}
                    <Button type="primary" long onClick={onSubmitClick} loading={loading}>
                        登录
                    </Button>
                    {/* <Button type="text" long className={styles['login-form-register-btn']}>
                        注册账号
                    </Button> */}
                </Space>
            </Form>
        </div>
    );
}
