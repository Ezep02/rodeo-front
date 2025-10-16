import React, { useState, useEffect } from "react";
import useCategories from "../../../../hooks/useCategories";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Props = {
  initialSelected: number[];
  onClose: () => void;
  onSave: (selectedIds: number[]) => void;
};

const CategorieSelector: React.FC<Props> = ({
  initialSelected,
  onClose,
  onSave,
}) => {
  const { categorieList } = useCategories();
  const [selected, setSelected] = useState<number[]>(initialSelected);

  const toggleCategory = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((catId) => catId !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    setSelected(initialSelected);
  }, [initialSelected]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {categorieList.map((cat) => {
          const isSelected = selected.includes(cat.id);
          return (
            <Badge
              key={cat.id}
              onClick={() => toggleCategory(cat.id)}
              className={`cursor-pointer ${isSelected ? "bg-zinc-900 text-zinc-50" : "bg-gray-200 text-zinc-900"}`}

            >
              {cat.name}
            </Badge>
          );
        })}
      </div>

      <div className="flex justify-end gap-2">
        <Button
          variant="ghost"
          onClick={onClose}
          className="rounded-full active:scale-95 cursor-pointer"
        >
          Cancelar
        </Button>
        <Button
          onClick={() => onSave(selected)}
          className="rounded-full active:scale-95 cursor-pointer"
        >
          Guardar
        </Button>
      </div>
    </div>
  );
};

export default CategorieSelector;
