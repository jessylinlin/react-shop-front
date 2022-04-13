import { Category } from './category'

export interface Product {
    "sold": number
    "_id": string
    "name": string
    "description": string
    "price": number
    "category": Category
    "quantity": number
    "shipping": boolean
    "createdAt": string,
    photo: FormData
}
export interface Price {
    id: number,
    name: string,
    array: [number?, number?]
}