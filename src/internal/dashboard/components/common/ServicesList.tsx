import { DashboardContext } from "@/context/DashboardContext";
import React, { useContext } from "react";
import { Button } from "@/components/ui/button";
import { Service } from "@/internal/panel-control/models/ServicesModels";

type ServiceListProps = {
  services: Service[] | []
  SearchMoreServices: () => Promise<void>
}

const ServicesList: React.FC<ServiceListProps> = ({ services, SearchMoreServices }) => {
  const { handleReserveClick } = useContext(DashboardContext)!;

  return (
    <>
      {services.map((srv, i) => (
        <article
          key={i}
          className="flex items-center justify-between rounded-lg border"
        >
          <div className="flex flex-col md:flex-row w-full ">
            <div
              className="flex h-32 w-full items-center justify-center bg-zinc-200 md:h-auto md:w-1/4"
              aria-label="Icono de servicio"
            >
              {/* <Scissors size={48} aria-hidden="true" /> */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={"1.5"} stroke="currentColor" className="h-10">
                <path strokeLinecap={"round"} strokeLinejoin="round" d="m7.848 8.25 1.536.887M7.848 8.25a3 3 0 1 1-5.196-3 3 3 0 0 1 5.196 3Zm1.536.887a2.165 2.165 0 0 1 1.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 1 1-5.196 3 3 3 0 0 1 5.196-3Zm1.536-.887a2.165 2.165 0 0 0 1.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863 2.077-1.199m0-3.328a4.323 4.323 0 0 1 2.068-1.379l5.325-1.628a4.5 4.5 0 0 1 2.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.33 4.33 0 0 0 10.607 12m3.736 0 7.794 4.5-.802.215a4.5 4.5 0 0 1-2.48-.043l-5.326-1.629a4.324 4.324 0 0 1-2.068-1.379M14.343 12l-2.882 1.664" />
              </svg>
            </div>

            <div className="flex flex-1 flex-col p-6">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h3 className="text-xl font-medium">{srv.title}</h3>
                <div className="text-xl font-bold text-green-500">${srv.price}</div>
              </div>

              <p className="mt-4 flex-1 text-zinc-600">{srv.description}</p>

              <div className="mt-6 flex justify-end">
                <Button
                  onClick={() => handleReserveClick(srv)}
                  aria-label={`Reservar servicio: ${srv.title}`}
                  className=""
                >
                  Reservar

                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={"2.5"} stroke="currentColor" className="ml-1 h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </article>
      ))}

      <div className="w-full flex justify-center">
        <Button onClick={SearchMoreServices} aria-label="Ver más servicios" className="">
          Ver más
        </Button>
      </div>
    </>
  )
}



export default ServicesList;
