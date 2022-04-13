//user
export interface User {
    email: string,
    name: string,
    role: number,
    _id: string
}

//token
export interface Jwt {
    user: User,
    token: string
}
