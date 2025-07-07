import { Product } from "../models/ServicesModels";
import { useContext, useEffect } from "react";
import { PanelControlContext } from "@/context/PanelControlContext";
import { GetProductList } from "../services/product_service";


export const useProduct = () => {
    const {
        setProductList,
        productList,
        setServicesOffset,
        servicesOffset,
        setSelectedServiceToDelete,
        selectedServiceToDelete,
    } = useContext(PanelControlContext)!;

    // conexion websocket encargada de recibir nuevos servicios, cambios repentinos como modificaciones y eliminaciones 
    // const { lastJsonMessage } = useWebSocket<Product>(`${import.meta.env.VITE_BACKEND_WS_URL}/services/notification-update`);
    // useEffect(() => {
    //     if (lastJsonMessage) {
    //         setProductList((prevProductList) => {
    //             const updatedProductList = prevProductList.filter(
    //                 (srv) => srv.ID !== lastJsonMessage.ID
    //             );

    //             return [...updatedProductList, lastJsonMessage];
    //         });
    //     }
    // }, [lastJsonMessage]);


    // Mover el offset de servicios creados por el barbero
    const sumProductOffset = () => {
        setServicesOffset(servicesOffset + 5);
    }

    // Carga los servicios si es que no hay, pero deben no estar cacheados previamente
    useEffect(() => {

        if (productList.length === 0) {
            const LoadProducts = async () => {

                const limit = 5;
                // Obtener nuevos datos desde la API
                const response = await GetProductList(limit, servicesOffset);

                if (response.products.length > 0) {

                    setProductList((prev) => {

                        const filtered = response.products.filter(
                            (newProduct) => !prev.some((existingProduct) => existingProduct.id === newProduct.id)
                        );

                        return [...prev, ...filtered];
                    });

                    sumProductOffset()
                }
            };
            LoadProducts()
        }
    }, []);


    // Funcion utilizada para mover el offset
    const SearchMoreBarberServices = async () => {

        const limit = 5;
        // Obtener nuevos datos desde la API
        const response = await GetProductList(limit, servicesOffset);

        if (response.products.length > 0) {

            setProductList((prev) => {

                const filtered = response.products.filter(
                    (newService) => !prev.some((existingService) => existingService.id === newService.id)
                );

                return [...prev, ...filtered];
            });

            sumProductOffset()
        }
    }


    // abre el pop en busqueda de preguntar si realmente quiere eliminar el servicio
   
    const HandleOpenDeleteServicePopUp = (service_to_delete: Product) => {
        setSelectedServiceToDelete(service_to_delete);
    }

    return {
        productList,
        SearchMoreBarberServices,
        selectedServiceToDelete,
        HandleOpenDeleteServicePopUp,
    }
}