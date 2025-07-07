import { DashboardContext } from "@/context/DashboardContext";
import { useContext, useEffect } from "react";
import {  ProductList } from "../../reservation/services/shop_service";


export const useProductShop = () => {

    const {
        productShop,
        setProductShop
    } = useContext(DashboardContext)!

    
    // Cargar inicial de productos
    useEffect(() => {

        const FetchProducts = async () => {
            try {
                const res = await ProductList()
                if(res.products){
                    setProductShop(res.products)
                }
            } catch (error) {
                console.warn("Product shop err", error)
            }
        }
        FetchProducts()
    }, [])




    // useEffect(() => {
    //     if (services.length == 0) {

    //         const AllServices = async () => {

    //             let limit: number = 5;

    //             try {
    //                 const fetchedServices: CustomerServices[] = await GetServices(limit, serviceOffset);

    //                 if (Array.isArray(fetchedServices) && fetchedServices.length > 0) {
    //                     setServices((prev) => {

    //                         const filtered = fetchedServices.filter(
    //                             (newService) => !prev.some((existingService) => existingService.ID === newService.ID)
    //                         );

    //                         return [...prev, ...filtered];
    //                     });

    //                     sumServiceOffset()
    //                 }

    //             } catch (error) {
    //                 console.error("Error fetching services:", error);
    //             }
    //         };
    //         AllServices()
    //     }
    // }, []);

    // Funcion utilizada para mover el offset
    // const SearchMoreServices = async () => {

    //     let limit: number = 5;

    //     try {
    //         const fetchedServices: CustomerServices[] = await GetServices(limit, serviceOffset);

    //         if (Array.isArray(fetchedServices) && fetchedServices.length > 0) {
    //             setServices((prev) => {

    //                 const filtered = fetchedServices.filter(
    //                     (newService) => !prev.some((existingService) => existingService.ID === newService.ID)
    //                 );

    //                 return [...prev, ...filtered];
    //             });

    //             sumServiceOffset()
    //         }

    //     } catch (error) {
    //         console.error("Error fetching services:", error);
    //     }
    // }

    return {
      productShop,
    }
}