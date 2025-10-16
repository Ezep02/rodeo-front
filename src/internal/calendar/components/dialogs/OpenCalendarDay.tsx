import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import React, { useState } from "react";

import EventAdder from "../form/EventAdder";

type Props = {
  textChild: Date;
};

const OpenCalendarDay: React.FC<Props> = ({ textChild }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  
  const toggleOpen = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <Dialog open={isOpen} onOpenChange={toggleOpen}>
      <DialogTrigger asChild>
        <Button
          className="cursor-pointer rounded-full"
          size="sm"
          variant="ghost"
        >
          {textChild.toLocaleDateString("es-AR", {
            day: "numeric",
            month: "long",
            weekday: "short",
          })}
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
          p-6 flex flex-col bg-zinc-50 z-50 md:rounded-4xl
          shadow-2xl overflow-hidden overflow-y-scroll scroll-hidden
        "
      >
        <EventAdder
          calendarDayDate={textChild}
          onBack={toggleOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default OpenCalendarDay;
