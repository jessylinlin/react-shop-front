import React, { FC, useEffect } from 'react'
import { List, Typography, Checkbox as AntdCheckbox } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getCategory } from '../../store/actions/category.action'
import { AppState } from '../../store/reducers'
import { CategoryState } from '../../store/reducers/category.reducer'
import { CheckboxValueType } from 'antd/lib/checkbox/Group'

const { Title } = Typography

interface Props {
    handleFilter: (arg: string[]) => void
}

const Checkbox:FC<Props> = ({handleFilter}) => {
    const dispatch = useDispatch()

    const { category } = useSelector<AppState, CategoryState>(state => state.category)

    useEffect(() => {
        dispatch(getCategory())
    }, [])

    const onChange = (checkedValue: CheckboxValueType[]) => {
        handleFilter(checkedValue as string[])
    }
    return (
        <>
            <Title level={4}>按照分类筛选</Title>
            <AntdCheckbox.Group 
                className='checkboxFilter'
                options={category.result.map(item => ({
                    label: item.name,
                    value: item._id
                }))}
                onChange={onChange}
            />
            {/* <List dataSource={categories} renderItem={item => (
                <List.Item><AntdCheckbox>{item.name}</AntdCheckbox></List.Item>
            )}/> */}
        </>
    )
}

export default Checkbox
