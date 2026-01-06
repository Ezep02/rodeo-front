import { Button } from "@/components/ui/button";
import { GoArrowUpRight } from "react-icons/go";

const NewReservation = () => {
  return (
    <div className="flex justify-between flex-col gap-3 p-7 rounded-4xl bg-[url('./bg.webp')] bg-cover">
      
       {/* Content */}
        <div className="">
         
          <h2 className="text-zinc-900 text-3xl md:text-4xl font-bold mb-6 leading-tight max-w-md">
            Tu mejor versión empieza con un buen corte
          </h2>
          
          <Button className="rounded-full cursor-pointer">
            Reservar Ya
            <GoArrowUpRight size={20} />
          </Button>
        </div>
    </div>
  );
};

export default NewReservation;
