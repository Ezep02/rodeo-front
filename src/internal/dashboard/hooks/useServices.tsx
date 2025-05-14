import { DashboardContext } from "@/context/DashboardContext";
import { useContext, useEffect } from "react";
import { GetServices } from "../services/DashboardService";
import { Service } from "@/internal/panel-control/models/ServicesModels";


export const useServices = () => {

    const { services, setServices, serviceOffset, setServiceOffset } = useContext(DashboardContext)!;

    // sum offset 
    const sumServiceOffset = () => {
        setServiceOffset(serviceOffset + 5);
    }

    useEffect(() => {

        if (services.length == 0) {

            const AllServices = async () => {

                let limit: number = 5;

                try {
                    const fetchedServices: Service[] = await GetServices(limit, serviceOffset);

                    if (Array.isArray(fetchedServices) && fetchedServices.length > 0) {
                        setServices((prev) => {

                            const filtered = fetchedServices.filter(
                                (newService) => !prev.some((existingService) => existingService.ID === newService.ID)
                            );

                            return [...prev, ...filtered];
                        });

                        sumServiceOffset()
                    }

                } catch (error) {
                    console.error("Error fetching services:", error);
                }
            };
            AllServices()
        }
    }, []);

    // Funcion utilizada para mover el offset
    const SearchMoreServices = async () => {

        let limit: number = 5;

        try {
            const fetchedServices: Service[] = await GetServices(limit, serviceOffset);

            if (Array.isArray(fetchedServices) && fetchedServices.length > 0) {
                setServices((prev) => {

                    const filtered = fetchedServices.filter(
                        (newService) => !prev.some((existingService) => existingService.ID === newService.ID)
                    );

                    return [...prev, ...filtered];
                });

                sumServiceOffset()
            }

        } catch (error) {
            console.error("Error fetching services:", error);
        }
    }

    return {
        services,
        sumServiceOffset,
        SearchMoreServices,
    }
}