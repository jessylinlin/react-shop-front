import { List, Radio, Typography } from 'antd'
import { RadioChangeEvent } from 'antd/lib/radio'
import React, { FC } from 'react'
import prices from '../../helpers/price'

const { Title } = Typography

interface Props {
    handleFilter: (arg: number[]) => void
}

export const Radiobox: FC<Props> = ({ handleFilter }) => {
    const onChange = (event: RadioChangeEvent) => {
        handleFilter(event.target.value)
    }
    return (
        <>
            <Title level={4}>按照价格筛选</Title>
            <Radio.Group>
                <List dataSource={prices} renderItem={item => (
                    <List.Item>
                        <Radio 
                            value={item.array}
                            onChange={onChange}
                        >{item.name}</Radio>
                    </List.Item>
                )}/>
            </Radio.Group>
        </>
    )
}
