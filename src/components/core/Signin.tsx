import React from 'react'
import Layout from './Layout'
import { Form, Input, Button, Result} from 'antd'
import { SigninPayload } from '../../store/actions/auth.action'
import { useDispatch, useSelector } from 'react-redux'
import { signin } from '../../store/actions/auth.action'
import { AppState } from '../../store/reducers'
import { AuthState } from '../../store/reducers/auth.reducer'
import { isAuth } from '../../helpers/auth'
import { Jwt } from '../../store/models/auth'
import { Redirect } from 'react-router-dom'

const Signin = () => {
      //触发action
    const dispatch = useDispatch()
    const onFinish = (value: SigninPayload) => {
      dispatch(signin(value))
    }

    //1、获取登录结果
    const auth = useSelector<AppState, AuthState>(state => state.auth)

    //2 登录失败 显示错误
    const showError = () => {
        if (auth.signin.loaded && !auth.signin.success) {
            return (
                <Result
                status="error"
                title="注册失败!"
                subTitle={auth.signin.message}
              />
            )
        }
    }

    //3 成功 根据角色跳转到对应管理页面
    const redirectToDashBoard = () => {
        const auth = isAuth()
        console.log(auth)
        if (auth) {
            const {user: { role }} = auth as Jwt

            if (role === 0) {
                //注册用户
                return <Redirect to="/user/dashboard" />
            } else {
                return <Redirect to="/admin/dashboard" />
            }
        }
    }

    //4 处理导航链接 ｜ 登录后隐藏登录注册

    const signinForm = () => (
        <Form onFinish={onFinish}>
            <Form.Item name="email" label="邮箱">
                <Input />
            </Form.Item>
            <Form.Item name="password" label="密码">
                <Input.Password/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType='submit'>登录</Button>
            </Form.Item>
        </Form>
    )


    return (
        <Layout title="登录" subTitle=''>
            {showError()}
            {redirectToDashBoard()}
            {signinForm()}
        </Layout>
    )
}

export default Signin
