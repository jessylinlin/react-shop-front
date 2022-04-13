import { Product } from "../store/models/product";

/**
 * 将商品添加到购物车
 */

export interface CartItem extends Product {
    count: number
}

export const addItem = (item: Product, next: () => void) => {
    //next 将商品添加到购物车后要做的事情
    let cart: CartItem[] = []

    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart')!)
        }
        cart.push({
            ...item,
            count: 1
        })
    }
    //去重
    cart= Array.from(new Set(cart.map(item => item._id))).map(id => {
        return cart.find(product => product._id === id)
    }) as CartItem[]

    localStorage.setItem('cart', JSON.stringify(cart))

    next()
}

/**
 * 获取本地数据
 */

export const getCart = () => {
    if (typeof window !== undefined) {
        if (localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart')!) as CartItem[]
        }
    }

    return []
}

/**
 * 更改数量
 */
export const updateItem = (id: string, count: number) => {
    let cart: CartItem[] = []

    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart')!)
        }

        cart.forEach((item, index) => {
            if(item._id === id) {
                cart[index].count = count
            }
        })

        localStorage.setItem('cart', JSON.stringify(cart))
    }

    return cart
}

/**
 * 删除购物车商品
 */
export const deleteCartItem = (id: string) => {
    let cart: CartItem[] = []

    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart')!)
        }

        cart.forEach((item, index) => {
            if(item._id === id) {
                cart.splice(index, 1)
            }
        })

        localStorage.setItem('cart', JSON.stringify(cart))
    }

    return cart
}

/**
 * 获取商品数量
 */
export const itemCount = () => {
    if (typeof window !== undefined) {
        if (localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart')!).length
        }
    }

    return  0
}