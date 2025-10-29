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

const mockBarbers = [
  {
    id: 1,
    name: "Lucas",
    surname: "Fernández",
    email: "lucas.fernandez@barbershop.com",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
    created_at: "2024-03-15T10:30:00Z",
  },
  {
    id: 2,
    name: "Martín",
    surname: "Gómez",
    email: "martin.gomez@barbershop.com",
    avatar: "https://randomuser.me/api/portraits/men/33.jpg",
    created_at: "2024-05-02T14:45:00Z",
  },
  {
    id: 3,
    name: "Santiago",
    surname: "Pérez",
    email: "santiago.perez@barbershop.com",
    avatar: "https://randomuser.me/api/portraits/men/44.jpg",
    created_at: "2024-06-10T08:20:00Z",
  },
  {
    id: 4,
    name: "Diego",
    surname: "Navarro",
    email: "diego.navarro@barbershop.com",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    created_at: "2024-07-01T09:00:00Z",
  },
  {
    id: 5,
    name: "Tomás",
    surname: "Rojas",
    email: "tomas.rojas@barbershop.com",
    avatar: "https://randomuser.me/api/portraits/men/66.jpg",
    created_at: "2024-09-18T17:40:00Z",
  },
];

const BarbersManager = () => {
  return (
    <div className="pt-3">
      <div className="rounded-3xl border border-zinc-200/80">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Creacion</TableHead>
              <TableHead>
                <div className="flex justify-end pr-2">
                  Acciones
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {Array.isArray(mockBarbers) && mockBarbers.length > 0 ? (
              mockBarbers.map((cat) => (
                <TableRow key={cat.id} className="border-none">
                  <TableCell>{cat.name}</TableCell>
                  <TableCell>
                    {cat.created_at ? (
                      <span className="text-gray-500">
                        {new Date(cat.created_at).toLocaleDateString("es-AR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    ) : (
                      <span className="text-gray-400 italic">Sin color</span>
                    )}
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
