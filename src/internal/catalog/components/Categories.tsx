import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, PlusIcon } from "lucide-react";
import CategoriesForm from "./dialog/CategoriesForm";
import useCategories from "../../../hooks/useCategories";

const Categories: React.FC = () => {
  const { categorieList } = useCategories();

  return (
    <div className="">
      <div className="rounded-4xl border border-zinc-200/80">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Creacion</TableHead>
              <TableHead>
                <div className="flex justify-end pr-1.5">
                  <CategoriesForm
                    trigger={
                      <Button
                        className="rounded-full cursor-pointer active:scale-95"
                        size={"icon"}
                        variant={"default"}
                      >
                        <PlusIcon />
                      </Button>
                    }
                  />
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {Array.isArray(categorieList) && categorieList.length > 0 ? (
              categorieList.map((cat) => (
                <TableRow key={cat.id} className="border-none">
                  <TableCell>{cat.name}</TableCell>
                  <TableCell>
                    {cat.created_at ? (
                      <span className="text-gray-500">
                        {new Date(cat.created_at).toLocaleDateString("es-AR", {
                          day:"numeric", month:"long", year:"numeric"
                        })}
                      </span>
                    ) : (
                      <span className="text-gray-400 italic">Sin color</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end">
                      <CategoriesForm
                        categorie={cat}
                        trigger={
                          <Button
                            variant="ghost"
                            className="rounded-full active:scale-95 cursor-pointer"
                          >
                            <ArrowUpRight />
                            Abrir
                          </Button>
                        }
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center text-gray-500 py-4"
                >
                  Aún no se detectaron categorías
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Categories;
