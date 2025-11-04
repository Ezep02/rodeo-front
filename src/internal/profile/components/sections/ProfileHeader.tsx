import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AuthContext } from "@/context/AuthContext";
import React, { useContext } from "react";
import { GiBullHorns } from "react-icons/gi";

const ProfileHeader = () => {
  const { user, userInfo } = useContext(AuthContext)!;

  return (
    <section className="flex flex-1 bg-zinc-900 min-h-[13vh] relative">
      
      <div className="flex items-center justify-center gap-2 w-full">
        <GiBullHorns size={34} className="text-zinc-100" />
      </div>

      <div className="absolute -bottom-24 left-7 flex gap-1.5">
        <Avatar className="w-30 h-30 border rounded-full overflow-hidden">
          <AvatarImage
            src={userInfo?.avatar || undefined}
            alt="Profile avatar"
          />
          <AvatarFallback className="uppercase bg-transparent text-zinc-50 text-sm">
            {user?.name?.charAt(0)}
            {user?.surname?.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-1 items-center">
          <div className="pt-4">
            <h2 className="text-gray-700 font-semibold">
              {userInfo?.name} {userInfo?.surname}
            </h2>
            <span>{userInfo?.email}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileHeader;
