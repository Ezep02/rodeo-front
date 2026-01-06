import AmenitiesCard from "../ui/card/AmenitiesCard";
import NewReservation from "../ui/card/NewReservation";

const AmenitieSection = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 pb-5 px-4 md:py-10 py-4">
      {/* Left: Greeting Component with Amenities */}
      <AmenitiesCard />

      <NewReservation />
      {/* <ActiveCoupons /> */}
    </div>
  );
};

export default AmenitieSection;
