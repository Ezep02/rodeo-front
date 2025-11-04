
// import PersonalInformation from "@/internal/profile/components/sections/PersonalInformation"
import ProfileHeader from "@/internal/profile/components/sections/ProfileHeader"
// import SecurityConfiguracion from "@/internal/profile/components/sections/SecurityConfiguracion"



const ProfilePage = () => {
  return (
    <div>

      <ProfileHeader/>

      <div className="grid md:grid-cols-3 px-4 md:p-10">
        {/* <PersonalInformation />
        <SecurityConfiguracion /> */}
      </div>
    </div>
  );
};

export default ProfilePage;
