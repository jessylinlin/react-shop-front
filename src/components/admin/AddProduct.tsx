import { Form, Upload, Button, Input, Select, Switch, message} from 'antd'
import React , {  useEffect, useState } from 'react'
import Layout from '../core/Layout'
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory } from '../../store/actions/category.action';
import { AppState } from '../../store/reducers';
import { CategoryState } from '../../store/reducers/category.reducer';
import { RcFile } from 'antd/lib/upload';
import Axios from 'axios';
import { API } from '../../config';
import { isAuth } from '../../helpers/auth';
import { Jwt } from '../../store/models/auth';

const AddProduct = () => {
    const dispatch = useDispatch()

    const [file, setFile] = useState<RcFile>()

    const category = useSelector<AppState, CategoryState>(state => state.category)
    console.log(category)

    useEffect(() => {
        dispatch(getCategory())
    }, [])

    const {user, token} = isAuth() as Jwt

    const onFinish = (product: any) => {
        //二进制图片 + text
        //formData
        console.log(product)
        const formData = new FormData()
        for (let attr in product) {
            let value = product[attr]

            if (attr === 'shipping' &&  value === undefined) {
                value = false
            }

            formData.set(attr, value)
        }
        if (typeof file !== undefined) {
            formData.set("photo", file as RcFile)
        }
        
        Axios.post(`${API}/product/create/${user._id}`, formData, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(
            () => {
                message.success('商品添加成功')
            },
            () => {
                message.error('添加失败')
            }
        )
    }

    const addProductForm = () => {
        const props = {
            accept: 'image/*',
            beforeUpload: function(file: RcFile) {
                setFile(file)

                return false
            }
        }
        return (
            <Form onFinish={onFinish} initialValues={{category: ''}}>
                <Form.Item>
                <Upload {...props}>
                    <Button icon={<UploadOutlined />}>上传商品封面</Button>
                </Upload>
                </Form.Item>
                <Form.Item name="name" label="商品名称">
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="商品描述">
                    <Input />
                </Form.Item>
                <Form.Item name="price" label="商品价格">
                    <Input />
                </Form.Item>
                <Form.Item name="category" label="所属分类">
                    <Select>
                        <Select.Option value="">
                            请选择分类
                        </Select.Option>
                        {
                            category.category.result.map(item => (
                                <Select.Option value={item._id} key={item._id}>
                                    {item.name}
                                </Select.Option>
                            ))
                        }
                    </Select>
                </Form.Item>
                <Form.Item name="quantity" label="商品数量">
                    <Input />
                </Form.Item>
                <Form.Item name="shipping" label="是否需要运输">
                    <Switch />
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit'>添加商品</Button>
                </Form.Item>
            </Form>
        )
    }
    
    return (
        <Layout title='添加商品' subTitle=''>
            {addProductForm()}
        </Layout>
    )
}

export default AddProduct
