import React, { useEffect, useState } from "react";
import { Service } from "../../../types/ServiceTypes";
import { useServiceAction } from "../hooks/useServiceAction";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CategorieSelector from "./dialog/CategorieSelector";

type Props = {
  itemInfo: Service;
  trigger?: React.ReactNode;
};

const CategoriesInformation: React.FC<Props> = ({ itemInfo, trigger }) => {
  const { updateServiceCategories } = useServiceAction();

  const [selected, setSelected] = useState<number[]>(
    itemInfo.categories?.map((c) => c.id) || []
  );
  const [original, setOriginal] = useState<number[]>(
    itemInfo.categories?.map((c) => c.id) || []
  );
  const [openDialog, setOpenDialog] = useState(false);

  const handleSave = (newSelected: number[]) => {
    setSelected(newSelected);
    setOpenDialog(false);

    const toAdd = newSelected.filter((id) => !original.includes(id));
    const toRemove = original.filter((id) => !newSelected.includes(id));

    // Logica del hook
    updateServiceCategories(itemInfo.id, { toAdd, toRemove });
  };

  useEffect(() => {
    setSelected(itemInfo.categories?.map((c) => c.id) || []);
    setOriginal(itemInfo.categories?.map((c) => c.id) || []);
  }, [itemInfo]);

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-2">
        {itemInfo.categories?.length ? (
          itemInfo.categories.map((cat) => (
            <Badge
              key={cat.id}
            >
              {cat.name}
            </Badge>
          ))
        ) : (
          <p className="text-sm text-gray-500">No hay categorías asignadas.</p>
        )}
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Seleccionar categorías</DialogTitle>
          </DialogHeader>
          <CategorieSelector
            initialSelected={selected}
            onClose={() => setOpenDialog(false)}
            onSave={handleSave}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategoriesInformation;
