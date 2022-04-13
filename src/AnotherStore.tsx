import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { itemCount } from './helpers/cart'

//传递给其他组件
export const TotalContext = React.createContext<[number, Dispatch<SetStateAction<number>>]>([
    0, () => null
])

interface Props {
    children: React.ReactNode
}

//共享状态的组件
const AnotherStore:FC<Props> = ({ children }) => {
    const [count, setCount] = useState(itemCount())
    return  <TotalContext.Provider value={[count, setCount]}> 
        {children}
    </TotalContext.Provider>
}

export default AnotherStore
