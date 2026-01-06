import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";

import { HiMiniArrowUpRight } from "react-icons/hi2";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Service } from "../../../../types/ServiceTypes";
import PromotionList from "../PromotionList";
import DeleteServiceDialog from "./DeleteServiceDialog";
import CategoriesInformation from "../CategoriesInformation";
import ServiceForm from "./ServiceForm";
import { Edit3 } from "lucide-react";
import { PiEmptyLight } from "react-icons/pi";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { LuLoader } from "react-icons/lu";
import { CiEdit } from "react-icons/ci";
import { GoTag } from "react-icons/go";
import GalleryViewer from "../GalleryViewer";

type Props = {
  item: Service;
};

const ViewDetail: React.FC<Props> = ({ item }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Dialog open={isOpen} onOpenChange={toggleOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          className="rounded-full active:scale-95 cursor-pointer"
        >
          <HiMiniArrowUpRight /> Abrir
        </Button>
      </DialogTrigger>

      <DialogContent
        className="
          2xl:max-h-[90vh] 2xl:min-h-[80vh] 2xl:max-w-5xl
          xl:max-h-[90vh] xl:min-h-[80vh] xl:max-w-4xl 
          lg:max-h-[90vh] lg:min-h-[85vh] lg:max-w-3xl
          md:max-h-[95vh] md:min-h-[80vh] md:max-w-2xl  
          max-w-full max-h-full
          w-full h-full 
          p-2 md:p-6 flex flex-col bg-zinc-50 md:rounded-4xl
          shadow-2xl overflow-hidden overflow-y-scroll scroll-hidden"
      >
        <DialogHeader>
          <div className="flex gap-4 mb-3 items-center">
            <button
              onClick={toggleOpen}
              className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 transition cursor-pointer"
            >
              <MdOutlineKeyboardArrowLeft size={24} className="text-zinc-700" />
            </button>
          </div>
        </DialogHeader>

        <div className="p-2 md:px-10 flex-1 grid grid-cols-1 lg:grid-cols-2 gap-1.5">
          <div className="p-5 bg-gray-100 rounded-4xl flex flex-col col-span-2">
            {/* INFORMACION BASICA */}

            <div className="lg:col-span-2 flex justify-between">
              <div>
                <DialogTitle className="">Detalles</DialogTitle>
              </div>
              <ServiceForm
                service={item}
                trigger={
                  <Button
                    className="rounded-full cursor-pointer active:scale-95"
                    size={"icon"}
                    variant={"ghost"}
                  >
                    <Edit3 size={20} />
                  </Button>
                }
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="flex gap-4">
                {item.preview_url ? (
                  <img
                    key={item.id}
                    src={item?.preview_url ?? ""}
                    alt={`sin foto`}
                    className="w-20 h-20 object-cover rounded-xl shadow"
                  />
                ) : (
                  <div className="w-18 h-18 flex justify-center items-center shadow rounded-xl">
                    <PiEmptyLight size={20} />
                  </div>
                )}

                <div>
                  <DialogDescription>{item.name}</DialogDescription>
                  <DialogDescription>{item.description}</DialogDescription>
                  <span className="text-lg text-green-500 font-semibold">
                    ${item.price}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                <div className="flex gap-2">
                  <div className="flex gap-1 items-center">
                    <LuLoader />
                    <Label>Estado</Label>
                  </div>
                  <Badge>{item.is_active ? "Activo" : "Oculto"}</Badge>
                </div>

                <div className="flex gap-2">
                  <div className="flex gap-0.5 items-center">
                    <GoTag />
                    <Label>Etiquetas</Label>
                  </div>

                  <CategoriesInformation
                    itemInfo={item}
                    trigger={
                      <Button
                        size={"icon"}
                        variant="outline"
                        className="rounded-full active:scale-95 cursor-pointer"
                      >
                        <CiEdit size={16} />
                      </Button>
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* PROMOCIONES */}
          <PromotionList itemInfo={item} />
          <GalleryViewer itemInfo={item} />
        </div>

        <DialogFooter className="sticky bottom-0 flex justify-end gap-2 p-4">
          <div>
            <DeleteServiceDialog itemId={item.id} />
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewDetail;
