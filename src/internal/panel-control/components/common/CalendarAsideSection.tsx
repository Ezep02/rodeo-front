import { CancelButton, Button } from "@/components/common/CustomButtons";
import Calendar from "@/components/ui/calendar";

const CalendarAsideSection: React.FC<{
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  schedulesLoader: boolean;
  HandleSaveSchedulesChanges: () => void;
  HandleModifyScheduler: () => void;
}> = ({ date, setDate, HandleSaveSchedulesChanges, HandleModifyScheduler }) => {
  return (
    <aside
      className="
        xl:col-start-2 xl:col-end-5 xl:row-start-2 xl:row-end-12
        lg:col-start-2 lg:col-end-5 lg:row-start-2 lg:row-end-12
        bg-white rounded-lg shadow-lg
        flex flex-col gap-1 col-start-1 col-end-13 row-start-1 row-end-6 items-center w-full h-full"
    >
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        showOutsideDays={false}
        className="myDatePicker"
        disabled={(date) => {
          const todayUTC = new Date(new Date().toISOString().split("T")[0]);
          return date <= todayUTC;
        }}
      />

      <div className="gap-2 flex py-2">
        <Button text="Confirmar" onClickAction={HandleSaveSchedulesChanges} />
        <CancelButton text="Cancelar" onClickAction={HandleModifyScheduler} />
      </div>
    </aside>
  );
};

export default CalendarAsideSection;
