import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { LockOutlined, UserOutlined, SecurityScanOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Form, Input, Cascader, Spin } from 'antd';
import { useSelector } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit';
import JSEncrypt from 'jsencrypt';

import { selectLogin } from '@/redux/reducers/loginReducer'

import '@/css/login.css';
import '@/css/loading.css';
import { getImgVerificationCode, getPublicKey, getTenantsId, getTenantsOptionList, login } from '@/api/loginApi'

const usernameRules = [
    {
        required: true,
        message: 'Please input your Username!',
    },
];
const passwordRules = [
    {
        required: true,
        message: 'Please input your Password!',
    },
];

const kyAccountsAndPwd = [
    {
        userName: 'admin',
        pwd: 'admin123',
    },
    {
        userName: 'test',
        pwd: 'test123',
    },
    {
        userName: 'laok5',
        pwd: 'test123',
    },
];


const alAccountsAndPwd = [
    {
        userName: 'tenant',
        pwd: 'tenant123',
    },
];
const accoutTypes = ['老寇云集团'];
const options = [
    {
        value: '0',
        label: accoutTypes[0],
        children: [
            {
                value: '0',
                label: 'admin',

            },
            {
                value: '1',
                label: 'test',

            },
            {
                value: '2',
                label: 'laok5',

            },
        ],
    }
];



export default function Login() {

    const loginReducer = useSelector(selectLogin);
    console.log('loginReducer', loginReducer)

    //图形验证码
    const [imgBase64, setImgBase64] = useState("");
    const [publicKey, setPublicKey] = useState("");
    //用于账号回显
    const [tenantsId, setTenantsId] = useState("");

    const [loginTenantsId, setLoginTenantsId] = useState("");

    const [tenantsOptionList, setTenantsOptionList] = useState([]);
    //登录要传
    const [nanoidStr, setNanoidStr] = useState("");

    useEffect(() => {
        let nanoidStr = nanoid();
        setNanoidStr(nanoidStr)
        getImgVerificationCode(nanoidStr).then(res => {
            const dataValue = res?.data;
            if (undefined !== dataValue) {
                setImgBase64(dataValue)
            }

        })
        getPublicKey().then(res => {
            const dataValue = res?.data;
            if (undefined !== dataValue) {
                setPublicKey(dataValue)
            }
        })

        getTenantsId().then(res => {
            const dataValue = res?.data;
            if (undefined !== dataValue) {
                setTenantsId(dataValue)
            }
        })

        getTenantsOptionList().then(res => {
            const dataValue = res?.data;
            if (undefined !== dataValue) {
                setTenantsOptionList(dataValue)
            }
        })
    }, []);

    //默认表单初始化值
    const [form] = Form.useForm();
    useEffect(() => {
        if ("0" === tenantsId) {
            let username = kyAccountsAndPwd[0].userName;
            setLoginTenantsId("0");
            form.setFieldsValue({ company: accoutTypes[0] + " / " + username, username: username, password: kyAccountsAndPwd[0].pwd });
        } else {
            tenantsOptionList.forEach(x => {
                const { label, value } = x;
                if (tenantsId === value === "1703312526740615171" && label === "阿里集团") {
                    setLoginTenantsId(value);
                    form.setFieldsValue({ company: label, username: alAccountsAndPwd[0].userName, password: alAccountsAndPwd[0].pwd });
                } else {
                    form.setFieldsValue({ company: label });
                }
            })
        }
    }, [form, tenantsId, tenantsOptionList]);

    //监听表单 company 的变化，根据变化更新账号密码
    const company = Form.useWatch('company', form);

    useEffect(() => {

        if (Array.isArray(company)) {
            setLoginTenantsId(company[0]);
            if (company[0] === "0") {

                form.setFieldsValue({ username: kyAccountsAndPwd[company[1]].userName, password: kyAccountsAndPwd[company[1]].pwd });
            }
            if (company[0] === "1703312526740615171") {
                form.setFieldsValue({ username: alAccountsAndPwd[0].userName, password: alAccountsAndPwd[0].pwd });
            }

            // 参数是数组类型
            console.log("company", company)

        }


    }, [company, tenantsOptionList, form]);

    const navigate = useNavigate();

    //已经登录了直接跳到首页
    useEffect(() => {
        // 添加监听逻辑
        const handleLogin = () => {
            const loginState = localStorage.getItem('loginState');
            if (loginState === "true") {
                navigate("/home")
            }
        };

        window.addEventListener('login', handleLogin);
        handleLogin();
        return () => {
            // 移除监听逻辑
            window.removeEventListener('login', handleLogin);
        };
    }, [navigate]);

    //登录

    const onFinish = (values) => {
        const { username, password, code } = values;
        const encrypt = new JSEncrypt();
        encrypt.setPublicKey(publicKey);
        const pwd = encrypt.encrypt(password);
        const accountName = encrypt.encrypt(username);
        const params = {
            username: accountName,
            password: pwd,
            captcha: code,
            uuid: nanoidStr,
            grant_type: 'password',
            tenant_id: loginTenantsId,
            auth_type: 0
        }
        //清除过期的登录信息
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('expires_in');
        localStorage.removeItem('User-Id');
        localStorage.removeItem('User-Name');
        localStorage.removeItem('Tenant-Id');
        login(params).then(res => {
            // 存储数据 access_token  refresh_token  expires_in 
           let access_token = res?.access_token;
           let refresh_token = res?.refresh_token;
           let expires_in =  res?.expires_in;
            if(access_token){
                localStorage.setItem('access_token', access_token);
            }
            if(refresh_token){
                localStorage.setItem('refresh_token', refresh_token);  
            }
            if(expires_in){
                localStorage.setItem('expires_in',expires_in);
            }
            if(tenantsId){
                localStorage.setItem('Tenant-Id', tenantsId);
            }
            navigate("/home")
        });

    };




    const cascaderOptions = () => {
        let alACount = "阿里集团"
        const accountNames = [];
        let conpanySize = tenantsOptionList.length;
        if (conpanySize > 0) {
            tenantsOptionList.forEach(x => {
                const { label, value } = x;
                if (alACount === label) {
                    accountNames.push(({ label, value, children: [{ value: '0', label: 'tenant' }] }))
                } else {
                    accountNames.push(({ label, value }))
                }
            })
            return [...options, ...accountNames]
        } else {
            return options;
        }
    }
    const handoverImg = () => {
        let nanoidStr = nanoid();
        setNanoidStr(nanoidStr)
        setImgBase64("");
        getImgVerificationCode(nanoidStr).then(res => {
            const dataValue = res?.data;
            if (undefined !== dataValue) {
                setImgBase64(dataValue)
            }

        })
    }

    return (
        <div className="Login" >
            <div className="LoginForm">

                <Form name="normal_login" className="login-form" form={form} onFinish={onFinish} >

                    <Form.Item name="company" type="array" rules={[{ required: true, message: '请选择所属公司' }]}>
                        <Cascader options={cascaderOptions()} placeholder="选择公司" />
                    </Form.Item>

                    <Form.Item name="username" rules={usernameRules}>
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="账号" autoComplete="username" />
                    </Form.Item>
                    <Form.Item name="password" rules={passwordRules}>
                        <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="密码" autoComplete="current-password" name="password" />
                    </Form.Item>
                    <Form.Item style={{ height: "32px" }}>
                        <Form.Item name="code" rules={[{ required: true, message: 'Please input your code!' },]} style={{ width: '210px', height: "32px", float: "left" }}>
                            <Input prefix={<SecurityScanOutlined className="site-form-item-icon" />} className="SecurityScanStlye" placeholder="验证码" autoComplete="code" name="code" />
                        </Form.Item>
                        <Form.Item style={{ width: '130px', height: "32px", float: "right" }}>
                            {
                                imgBase64 ? (<div className="imgBase64" ><img onClick={handoverImg} style={{ width: '112px', height: "40px" }} src={imgBase64} alt="验证码" /></div>) : (<div className='loading' ><Spin indicator={<LoadingOutlined style={{ fontSize: 24, }} spin />} /></div>)
                            }
                        </Form.Item>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">Log in </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}



