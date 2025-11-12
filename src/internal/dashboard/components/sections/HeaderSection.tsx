import GreetingCard from "../ui/card/GreetingCard";
import { useUser } from "@/hooks/useUser";
import FollowingSchedule from "../ui/card/FollowingSchedule";
import ActiveCoupons from "../ui/card/ActiveCoupons";

const HeaderSection = () => {
  const { userInfo } = useUser();

  return (
    <div className="grid grid-cols-3 gap-2 pb-5">
      <GreetingCard userName={userInfo?.username || ""} />
      <FollowingSchedule />
      <ActiveCoupons/>
    </div>
  );
};

export default HeaderSection;
