import React from "react";
import ReqAndBarberViewSelector, {
  SwitchReqViewMode,
} from "../common/ReqAndBarberViewSelector";
import BookingInbox from "../BookingInbox";
import BarbersManager from "../BarbersManager";
import useBarbers from "../../hooks/useBarbers";

const RequestsAndBarbers = () => {
  const [view, setView] = React.useState<SwitchReqViewMode>("client_requests");

  const { barberList } = useBarbers();

  function ViewModeRender() {
    switch (view) {
      case "client_requests":
        return <BookingInbox />;

      case "barber_list":
        return <BarbersManager barber_list={barberList ?? []} />;
      default:
        return;
    }
  }

  return (
    <section className="min-h-[90vh]">
      <ReqAndBarberViewSelector onChange={setView} view={view} />

      {ViewModeRender()}
    </section>
  );
};

export default RequestsAndBarbers;
