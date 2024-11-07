import {InstagramInstance}  from "../config/AxiosConfig";

export const GetProfileMedia = async () => {
    

    const res = await InstagramInstance.get(`/me/media?fields=id,caption,media_type,media_count,permalink,media_url,timestamp,is_shared_to_feed,like_count&access_token=${import.meta.env.VITE_ACCESS_TOKEN}&limit=10`)

    return res.data
}