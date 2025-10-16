import { Loader2, Plus } from "lucide-react";
import React from "react";
import useServiceMedia from "../hooks/useServiceMedia";
import { Service } from "@/types/ServiceTypes";
import { Button } from "@/components/ui/button";
import ServiceImgForm from "./dialog/ServiceImgForm";
import { FiEdit3 } from "react-icons/fi";

type Props = {
  itemInfo: Service;
};
const GalleryViewer: React.FC<Props> = ({ itemInfo }) => {
  const { isMediaLoading, serviceMedia } = useServiceMedia(itemInfo.id);

  return (
    <div className="bg-gray-100 p-5 rounded-4xl">
      <div className="flex justify-between items-center">
        <div className="p-2">
          <span className="text-gray-800 font-medium">Galeria</span>
          <p className="text-gray-600">Todas las imagenes del servicio</p>
        </div>

        <ServiceImgForm
          service_id={itemInfo.id}
          trigger={
            <Button
              className="rounded-full cursor-pointer active:scale-95"
              size={"icon"}
            >
              <Plus />
            </Button>
          }
        />
      </div>
      {/* LISTADO */}
      <div className="mt-2 pl-2">
        {isMediaLoading ? (
          <div className="p-2 flex justify-center">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <>
            {Array.isArray(serviceMedia) && serviceMedia.length > 0 ? (
              <ul className="flex flex-col gap-2">
                {serviceMedia.map((item, i) => (
                  <li key={i} className="flex justify-between">
                    <div>
                      <img
                        src={item.url}
                        className="w-20 h-20 object-cover rounded-2xl"
                        alt=""
                      />
                    </div>

                    <div>


                      <ServiceImgForm
                        service_id={itemInfo.id}
                        media={item}
                        trigger={
                          <Button
                            className="rounded-full cursor-pointer active:scale-95"
                            size={"icon"}
                            variant={"secondary"}
                          >
                            <FiEdit3 />
                          </Button>
                        }
                      />
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex justify-center items-center">
                <span>Sin promociones</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default GalleryViewer;
