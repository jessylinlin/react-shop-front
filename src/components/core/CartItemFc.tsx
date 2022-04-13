import React, { ChangeEvent, FC, useState } from 'react'
import { CartItem, deleteCartItem, updateItem } from '../../helpers/cart'
import { Button, Image, Input } from 'antd'
import { API } from '../../config'

interface Props {
    product: CartItem,
    setCart: (arg: CartItem[]) => void
}

const CartItemFc:FC<Props> = ({ product, setCart }) => {
    const [count, setCount] = useState(product.count)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value)
        let count = (parseInt(event.target.value))
        

        setCart(updateItem(product._id, count))

        //同步input
        setCount(count)
    }
    return (
        <tr className='ant-table-row'> 
            <td className='ant-table-cell'>
                <Image width={120} src={`${API}/product/photo/${product._id}`}/>
            </td>
            <td className='ant-table-cell'>
                {product.name}
            </td>
            <td className='ant-table-cell'>{product.price}</td>
            <td className='ant-table-cell'>{product.category.name}</td>
            <td className='ant-table-cell'>
                <Input 
                    type="number" 
                    value={product.count}
                    onChange={handleChange}
                />
            </td>
            <td className='ant-table-cell'>
                <Button 
                    type='primary' 
                    danger
                    onClick={() => setCart(deleteCartItem(product._id))}
                >
                    删除
                </Button>
            </td>
        </tr>
    )
}

export default CartItemFc
