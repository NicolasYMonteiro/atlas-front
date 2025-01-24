import { userInfo } from "node:os"

export interface User{
    id?: number,
    name: string,
    user: string,
    email: string,
    password: string
}