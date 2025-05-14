import { useEffect, useState } from "react";
import { GetPopularServices } from "../services/DashboardService";
import { PopularServices } from "../models/DashboardModels";



export const usePopularServices = () => {

    const [popularServices, setPopularServices] = useState<PopularServices[] | []>([]);


    useEffect(() => {
        // Fetch popular services here  
        const fetchPopularServices = async () => {
            try {
                const response = await GetPopularServices();
                if(response){
                    console.log(response)
                    setPopularServices(response);
                }
            } catch (error) {
                console.error("Error fetching popular services:", error);
            }
        }
        fetchPopularServices();
    },[])

    return {
        popularServices
    };
    
}