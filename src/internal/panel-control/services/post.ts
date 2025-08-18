import { AuthenticationInstance } from "@/configs/AxiosConfigs";
import { Post } from "../models/Post";


const POSTS_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/posts`;

type CreatePostRes = {
    message: string
    post: Post
}

export const Create = async (post: Omit<Post, 'id' | 'user_id' | "created_at" | "updated_at" | "is_published">) => {
    const res = await AuthenticationInstance.post<CreatePostRes>(`${POSTS_BASE_URL}/`, post)
    return res.data
}

type ListPostRes = {
    posts: Post[]
}

export const List = async (offset: number) => {
    const res = await AuthenticationInstance.get<ListPostRes>(`${POSTS_BASE_URL}/page/${offset}`)
    return res.data
}

export const Delete = async (id: number) => {
    const res = await AuthenticationInstance.delete(`${POSTS_BASE_URL}/${id}`)
    return res.data
}

export const Update = async (post: Post) => {
    const res = await AuthenticationInstance.put(`${POSTS_BASE_URL}/${post.id}`, post)
    return res.data
}