
import { useEffect, useState } from "react";
import { GetCloudImg } from "../services/PanelServices";
import { CloudinaryImage } from "../models/Cloudinary";


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
