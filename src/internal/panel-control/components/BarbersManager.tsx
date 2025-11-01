import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import ViewBarberDetails from "./dialogs/ViewBarberDetails";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { Barber } from "../models/Barbers";

type Props = {
  barber_list: Barber[] | []
}

const BarbersManager:React.FC<Props> = ({barber_list}) => {

  return (
    <div className="pt-3">
      <div className="rounded-3xl border border-zinc-200/80">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Apellido</TableHead>
              <TableHead>
                <div className="flex justify-end pr-2">
                  Acciones
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {Array.isArray(barber_list) && barber_list.length > 0 ? (
              barber_list.map((cat) => (
                <TableRow key={cat.id} className="border-none">
                  <TableCell>{cat.name}</TableCell>
                  <TableCell>
                    {cat.surname}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end">
                      <ViewBarberDetails
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

export default BarbersManager;
