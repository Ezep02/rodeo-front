import GreetingCard from "../ui/card/GreetingCard";
import { useUser } from "@/hooks/useUser";
import FollowingSchedule from "../ui/card/FollowingSchedule";
import ActiveCoupons from "../ui/card/ActiveCoupons";

const HeaderSection = () => {
  const { user } = useUser();

  return (
    <div className="grid grid-cols-3 gap-2">
      <GreetingCard userName={user?.username || ""} />
      <FollowingSchedule />
      <ActiveCoupons/>
    </div>
  );
};

export default HeaderSection;
