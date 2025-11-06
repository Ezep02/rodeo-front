import PersonalInformation from "@/internal/profile/components/sections/PersonalInformation";
// import SecurityConfiguracion from "@/internal/profile/components/sections/SecurityConfiguracion"

const ProfilePage = () => {
  return (
    <div className="grid md:grid-cols-2 px-4 md:p-10">
     

      <PersonalInformation />

      {/*
        <SecurityConfiguracion /> */}
    </div>
  );
};

export default ProfilePage;
