import AccountSummary from "@/internal/profile/components/sections/AccountSummary";
import ProfileHeader from "@/internal/profile/components/sections/ProfileHeader";

const ProfilePage = () => {
  return (
    <div className="px-4 md:p-10">
      <main className="flex-1 p-8 bg-background rounded-4xl space-y-8">
        {/* User Profile Section */}
        <ProfileHeader />

        <AccountSummary />
      </main>

      {/* <PersonalInformation /> */}

      {/*
        <SecurityConfiguracion /> */}
    </div>
  );
};

export default ProfilePage;
