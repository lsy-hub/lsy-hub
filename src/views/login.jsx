import React from 'react'
import { Form,Checkbox,Button,Input } from 'antd'
import request from '@/utils/request'
import Background from'../img/background.jpg'


function Login(props){
    const query = new URLSearchParams(props.location)
    const username = query.get('username')
    const rules = {
        username:[
            {
                require:true,
                message:'请输入用户名'
            }
        ],
        password:[
            {
                require:true,
                message:'请输入密码'
            }
        ]
    }
    const onFinish = function({username,password,remember}){
        request.get('/user/login',{
            params:{
                username,
                remember,
                password
            }
        }).then(({data})=>{
            if(data.status === 200){
              //当状态为200就保存信息到本店存储
                localStorage.setItem('userInfo',JSON.stringify(data.data))
                //将路径替换为Epic
                props.history.replace('/Epic')
            }
           })
    }
    return(
        <div style={{padding:20,backgroundColor:'#121212',height:980,backgroundImage: `url(${Background})`}}>
            <h1 style={{color:'#fff'}}>Epic商城后台管理系统</h1>
            <Form
                name="basic"
                labelCol={{
                    span: 6,
                }}
                wrapperCol={{
                    span: 10,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                autoComplete="off"
            >
               
                <Form.Item
                    style={{color:'#fff'}}
                    label="用户名"
                    name="username"
                    initialValue={username}
                    rules={ rules.username }
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    style={{color:'#fff'}}
                    label="密码"
                    name="password"
                    rules={rules.password}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 6,
                        span: 10,
                    }}
                >
                    <Checkbox style={{color:'#fff'}}>免登录</Checkbox>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 6,
                        span: 10,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        登录
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login;
