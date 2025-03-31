import useWebSocket from "react-use-websocket";
import { Service, ServiceRequest } from "../models/ServicesModels";
import { useContext, useEffect } from "react";
import { PanelControlContext } from "@/context/PanelControlContext";
import { CreateService, DeleteServiceByID, GetBarberServicesList, UpdateServiceByID } from "../services/PanelServices";



export const useServices = () => {
    const {
        setServiceList,
        serviceList,
        setServicesOffset,
        servicesOffset,
        deleteNotification,
        setDeleteNofitification,
        setSelectedServiceToEdit,
        setEditarServicio,
        setSelectedServiceToDelete,
        selectedServiceToDelete,
        setOpenAddService
    } = useContext(PanelControlContext)!;

    // conexion websocket encargada de recibir nuevos servicios, cambios repentinos como modificaciones y eliminaciones 
    const { lastJsonMessage } = useWebSocket<Service>(`${import.meta.env.VITE_BACKEND_WS_URL}/services/notification-update`);
    useEffect(() => {
        if (lastJsonMessage) {
            setServiceList((prevServiceList) => {
                const updatedServiceList = prevServiceList.filter(
                    (srv) => srv.ID !== lastJsonMessage.ID
                );

                return [...updatedServiceList, lastJsonMessage];
            });
        }
    }, [lastJsonMessage]);


    // Mover el offset de servicios creados por el barbero
    const sumBarberServiceOffset = () => {
        setServicesOffset(servicesOffset + 5);
    }

    // Carga los servicios si es que no hay, pero deben no estar cacheados previamente
    useEffect(() => {

        if (serviceList.length === 0) {
            const LoadServices = async () => {

                const limit = 5;
                // Obtener nuevos datos desde la API
                const response = await GetBarberServicesList(limit, servicesOffset);

                if (response.length > 0) {

                    setServiceList((prev) => {

                        const filtered = response.filter(
                            (newService) => !prev.some((existingService) => existingService.ID === newService.ID)
                        );

                        return [...prev, ...filtered];
                    });

                    sumBarberServiceOffset()
                }
            };
            LoadServices()
        }
    }, []);


    // Funcion utilizada para mover el offset
    const SearchMoreBarberServices = async () => {

        const limit = 5;
        // Obtener nuevos datos desde la API
        const response = await GetBarberServicesList(limit, servicesOffset);

        if (response.length > 0) {

            setServiceList((prev) => {

                const filtered = response.filter(
                    (newService) => !prev.some((existingService) => existingService.ID === newService.ID)
                );

                return [...prev, ...filtered];
            });

            sumBarberServiceOffset()
        }
    }


    // abre el pop en busqueda de preguntar si realmente quiere eliminar el servicio
    const HandleOpenDeletePopUp = () => {
        setDeleteNofitification((prev) => !prev);
    };

    // boton que maneja el eliminar, carga el servicio en el pop up
    const DeleteServiceHandler = (service: Service) => {
        setSelectedServiceToDelete(service);
    }

    // funcion que ejecuta la eliminacion
    const DeleteService = async (id: number) => {
        try {
            const res = await DeleteServiceByID(id);
            if (res.status === 200) {
                let filteredList = [...serviceList].filter((srv) => srv.ID !== id);
                setServiceList(filteredList);
                HandleOpenDeletePopUp();
            }
        } catch (error) {
            console.log(error);
        }
    };

    //abre la ventana de edicion de servicios
    const HandleOpenEditPopUp = () => {
        setEditarServicio((prev) => !prev);
    };

    // asigna el servicio al estado y luego abre la ventana 
    const HandleClickEditarServicio = (service: Service) => {
        setSelectedServiceToEdit(service);
        HandleOpenEditPopUp();
    };

    // funcion para manejar la actualizacion del servicio
    const UpdateServiceData = async (data: Service) => {
        try {
            await UpdateServiceByID(data, data.ID);
            HandleOpenEditPopUp();
        } catch (error) {
            console.log(error);
        }
    };

    // Abre el formulario de agregar servicio
    const HandleAddNewService = () => {
        setOpenAddService((prev) => !prev);
    };

    // crear un nuevo servicio
    const AddNewService = async (data: ServiceRequest) => {
        try {
            await CreateService(data);
        } catch (error) {
            console.log(error);
        }
    };

    return {
        serviceList,
        SearchMoreBarberServices,
        DeleteServiceHandler,
        DeleteService,
        deleteNotification,
        HandleOpenDeletePopUp,
        HandleClickEditarServicio,
        UpdateServiceData,
        HandleOpenEditPopUp,
        selectedServiceToDelete,
        AddNewService,
        HandleAddNewService
    }
}