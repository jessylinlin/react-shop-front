import { Button, Form, Input, Result } from 'antd'
import React from 'react'
import { signup, SignupPayload, signupReset } from '../../store/actions/auth.action'
import Layout from './Layout'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react' 
import authReducer, { AuthState } from '../../store/reducers/auth.reducer'
import { useSelector } from 'react-redux'
import { AppState } from '../../store/reducers'
import { Link } from 'react-router-dom'

const Signup = () => {
    //获取dispatch
    const dispatch = useDispatch()
    const auth = useSelector<AppState, AuthState>(state => state.auth)

    const onFinish = (value:SignupPayload) => {
        dispatch(signup(value))
    }

    const [ form ] = Form.useForm()

    //1 、success 清空表单
    useEffect(() => {
        if (auth.signup.loaded && auth.signup.success) {
            form.resetFields()
        }
    }, [auth])  
    // 显示提示信息
    const showSuccess = () => {
        if (auth.signup.loaded && auth.signup.success) {
            return (
                <Result
                status="success"
                title="注册成功!"
                extra={[
                  <Button type="primary" key="console">
                    <Link to='/signin'>login</Link>
                  </Button>
                ]}
              />
            )
        }
    }
    //2、fail 显示提示 
    
    const showFail = () => {
        if (auth.signup.loaded && !auth.signup.success) {
            return (
                <Result
                status="error"
                title="注册失败!"
                subTitle={auth.signup.message}
              />
            )
        }
    }
    //3 离开页面前 重置状态
    useEffect(() => {
        return () => {
            dispatch(signupReset())
        }
    }, [])
    
    const signupForm = () => (
        <Form onFinish={onFinish} form={form}>
            <Form.Item name="name" label="昵称">
                <Input />
            </Form.Item>
            <Form.Item name="password" label="密码">
                <Input.Password/>
            </Form.Item>
            <Form.Item name="email" label="邮箱">
                <Input />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType='submit'>注册</Button>
            </Form.Item>
        </Form>
    )

    return (
        <Layout title="注册" subTitle=''>
            {showSuccess()}
            {showFail()}
            {signupForm()}
        </Layout>
    )
}

export default Signup
