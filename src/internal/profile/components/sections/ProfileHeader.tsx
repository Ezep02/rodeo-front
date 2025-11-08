import { Camera, Edit2 } from "lucide-react";
import { useContext, useState } from "react";
import UpdateAvatar from "../dialogs/UpdateAvatar";
import { AuthContext } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ChangeUserName from "../dialogs/ChangeUserName";
import UpdateUserInfo from "../dialogs/UpdateUserInfo";
import { Button } from "@/components/ui/button";

const ProfileHeader = () => {
  const [avatarHover, setAvatarHover] = useState(false);
  const { userInfo } = useContext(AuthContext)!;

  return (
    <div className="flex gap-4 items-start pb-8 border-b border-border">
      <Avatar
        className="relative w-24 h-24 rounded-full bg-secondary flex items-center justify-center cursor-pointer overflow-hidden"
        onMouseEnter={() => setAvatarHover(true)}
        onMouseLeave={() => setAvatarHover(false)}
      >
        <AvatarImage src={userInfo?.avatar || undefined} alt="Profile avatar" />
        <AvatarFallback className="uppercase bg-transparent text-zinc-50 text-sm">
          {userInfo?.name?.charAt(0)}
        </AvatarFallback>
        {avatarHover && (
          <div className="absolute inset-0 bg-foreground/50 flex items-center justify-center transition-colors">
            <UpdateAvatar
              avatar={userInfo?.avatar ?? ""}
              trigger={<Camera size={24} className="text-background" />}
            />
          </div>
        )}
      </Avatar>

      <div className="flex-1">
        <div className="flex gap-1.5 items-center">
          {userInfo && (
            <ChangeUserName
              initUserData={userInfo}
              trigger={
                <div className="cursor-pointer active:scale-95">
                  <h2 className="font-semibold text-zinc-800 hover:text-zinc-700">
                    {userInfo?.username}
                  </h2>
                </div>
              }
            />
          )}
        </div>

        <p className="text-sm text-muted-foreground mb-2">{userInfo?.email}</p>

        <UpdateUserInfo
          user={userInfo}
          trigger={
            <Button
              type="button"
              variant="default"
              className="rounded-full active:scale-95 cursor-pointer"
            >
              <Edit2 size={16} />
              Editar perfil
            </Button>
          }
        />

        <div className="space-y-2 text-sm">
          {/* <div className="flex justify-between">
            <span className="text-muted-foreground">Plan:</span>
            <span className="font-medium text-foreground">Premium</span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
