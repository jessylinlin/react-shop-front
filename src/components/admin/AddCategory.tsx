import { Button, Form, Input, message } from 'antd'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { API } from '../../config'
import { isAuth } from '../../helpers/auth'
import { Jwt } from '../../store/models/auth'
import Layout from '../core/Layout'

const AddCategory = () => {
    const [name, setName] = useState<string>("")
    
   const {user, token} = isAuth() as Jwt

    const onFinish = (value: {name: string}) => {
        setName(value.name)
    }

    useEffect(() => {
        //异步函数
         if (name) {
            addCategory()
         }
    }, [name])

    async function addCategory () {
        try {
            const { data } = await axios.post<{name: string}>(`${API}/category/create/${user._id}`, 
            {
                name: name
            }, 
            {
                headers: {
                    Authorization : `Bearer ${token}`
                }
            }) 
            message.success(`[${data.name}] 分类添加成功`)
        } catch (error: any) {
            message.error(error.response.data.error)
        }
    }

    return (
        <Layout title='添加分类' subTitle=''>
            <Form onFinish={onFinish}>
                <Form.Item name="name" label="分类名称"> 
                    <Input />
                </Form.Item>
                <Form.Item >
                    <Button type="primary" htmlType='submit'>添加分类</Button>
                </Form.Item>
            </Form>
            <Button><Link to="/admin/dashboard">返回Dashboard</Link></Button>
        </Layout>
    )
}

export default AddCategory
