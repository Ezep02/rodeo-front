

// identificador_app = 910663307106552

import { InstagramInstance } from "@/configs/AxiosConfigs"
import { useEffect } from "react"

// clave_secreta_app=bce1913d714ba3c184ef7a79c7a23497

// graph.instagram.com

// GET https://graph.instagram.com/v23.0/me
//   ?fields={fields}
//   &access_token={access-token}

const useInstagram = () => {


    useEffect(() => {
        let access_token = "IGQWRPRW1oUWZAUQV9memR2dXdPOE5SVlk3ZAEY1S1dVLWFMR3VlY1hYNU5ZAblFsSDQ0SUk0MUxRbWNscFVYcGNWQzNwamNVNEV4ekcxN0w3ZA1E3UXlNWGhHUVdVd3FLSzhyaW83T3RlZAzVpcGVpcFV5TjQxeHhqVHcZD"
        // search images
        const FetchImages = async () => {

            try {
                const res = await InstagramInstance.get(`/me/media?fields=id,caption,media_type,media_url,permalink,timestamp&access_token=${access_token}`)
                console.log(res)

            } catch (error) {
                console.log(error)
            }
        }
        FetchImages()
    }, [])


    return {

    }
}

export default useInstagram
