import { useContext, useEffect } from "react";
import { PanelControlContext } from "@/context/PanelControlContext";
import { CreateProduct, DeleteProduct, GetProductList, UpdateProduct } from "../services/product_service";
import { Product } from "../models/ServicesModels";


export const useProduct = () => {
    const {
        setProductList,
        productList,
        setServicesOffset,
        servicesOffset,
        categories

    } = useContext(PanelControlContext)!;


    // Mover el offset de servicios creados por el barbero
    const sumProductOffset = () => {
        setServicesOffset(servicesOffset + 5);
    }

    // Carga los servicios si es que no hay, pero deben no estar cacheados previamente
    useEffect(() => {

        if (productList.length === 0) {
            const LoadProducts = async () => {
                // Obtener nuevos datos desde la API
                const response = await GetProductList(servicesOffset);

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

        // Obtener nuevos datos desde la API
        const response = await GetProductList(servicesOffset);

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

    const CreateService = async (service: Omit<Product, "id">) => {
        try {
            let res = await CreateProduct(service);
            if (res) {
                setProductList((prev) => [...prev, service as Product]);
            }
        } catch (error) {
            console.warn("Error al crear el servicio:", error);
        }
    }

    const UpdateService = async (service: Product) => {

        try {
            // console.log("service update", service)
            const res = await UpdateProduct(service, service.id);
            if (res) {
                console.log("UPDATE RES", res)
                setProductList(prev =>
                    prev.map(s =>
                        s.id === service.id
                            ? {
                                ...s,
                                ...service,
                                category: categories.find(c => c.id === service.category_id) || s.category
                            }
                            : s
                    )
                );


            }
        } catch (error) {
            console.error("Error al actualizar el servicio:", error);
        }
    }

    const DeleteService = async (id: number) => {
        try {
            const res = await DeleteProduct(id)
            if (res) {
                setProductList((prev) =>
                    prev.filter((s) => (s.id !== id))
                );
            }
        } catch (error) {
            console.error("Error al eliminar el servicio:", error);
        }
    }

    return {
        productList,
        SearchMoreBarberServices,
        CreateService,
        UpdateService,
        DeleteService
    }
}