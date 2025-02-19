import { TaskClassico } from "./task.model"

export interface User{
    id?: number,
    name: string,
    user: string,
    email: string,
    password: string
    tasks:    TaskClassico[],
}