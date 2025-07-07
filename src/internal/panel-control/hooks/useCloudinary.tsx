
import { useEffect, useState } from "react";

import { CloudinaryImage } from "../models/Cloudinary";
import { GetCloudImg } from "../services/cloudinary";


const useCloudinary = () => {

    // Cloudinary instance

    const [cloudImgGallery, setCloudImgGallery] = useState<CloudinaryImage[] | []>([])

    useEffect(() => {

        const CloudinaryFetchGallery = async () => {

            try {
                
                const result = await GetCloudImg()
              
                if(result.length > 0){
                    setCloudImgGallery(result)
                }
            } catch (error) {
                console.warn("Algo no fue bien recibiendo las imagenes", error)
            }
        }

        CloudinaryFetchGallery()
    }, [])

    return {
        cloudImgGallery
    }
}

export default useCloudinary
