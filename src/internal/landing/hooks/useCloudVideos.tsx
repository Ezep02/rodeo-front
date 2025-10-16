import { useEffect, useState } from "react"
import { cloudinaryVideo } from "../models/Cloudinary"
import { GetVideos } from "../services/cloudinary_videos"



const useCloudVideos = () => {

    const [cloudinaryVideos, setCloudinaryVideos] = useState<cloudinaryVideo[]>([])

    useEffect(() => {

        const fetchVideos = async () => {

            try {
                let res = await GetVideos()
                console.log(res)
                if (res.length > 0) {
                    setCloudinaryVideos(res)
                }
            } catch (error) {
                console.warn("videos not found")
            }
        }

        fetchVideos()
    }, [])

    return {
        cloudinaryVideos
    }
}

export default useCloudVideos
