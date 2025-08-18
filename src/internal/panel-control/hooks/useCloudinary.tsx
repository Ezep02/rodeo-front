
import { useEffect, useState } from "react";

import { GetCloudImg } from "../services/cloudinary";
import { CloudinaryImage } from "../models/Cloudinary";


const useCloudinary = () => {

    // Cloudinary instance

    const [cloudImgGallery, setCloudImgGallery] = useState<CloudinaryImage[] | []>([])
    const [cloudNextCursor, setCloudNextCursor] = useState<string>("")

    useEffect(() => {

        const CloudinaryFetchGallery = async () => {

            try {

                const result = await GetCloudImg("")

                if (result.assets.length > 0) {

                    if (result.next_cursor) {
                        setCloudNextCursor(result.next_cursor)
                    }

                    setCloudImgGallery(result.assets)
                }
            } catch (error) {
                console.warn("Algo no fue bien recibiendo las imagenes", error)
            }
        }

        CloudinaryFetchGallery()
    }, [])

    const FetchMoreImg = async () => {
        try {
            const result = await GetCloudImg(cloudNextCursor)
            if (result.assets.length > 0) {

                if (result.next_cursor) {
                    setCloudNextCursor(result.next_cursor)
                }
                
                setCloudImgGallery(prev => [...prev, ...result.assets])
            }
        } catch (error) {
            console.warn("Algo no fue bien recibiendo las imagenes", error)
        }
    }

    return {
        cloudImgGallery,
        FetchMoreImg,
        cloudNextCursor
    }
}

export default useCloudinary
