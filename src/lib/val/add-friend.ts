import {z} from "zod"

export const addFriend=z.object({
    name:z.string().min(3,"not valid"),
})