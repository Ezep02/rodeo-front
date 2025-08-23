import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Edit3 } from "lucide-react";

const ProfileConfiguration: React.FC = () => {
  const [isPrivate, setIsPrivate] = useState(false);
  const [portfolioLink, setPortfolioLink] = useState("brainwave.app/@username");
  const [displayName, setDisplayName] = useState("Sophie Bennett ®");

  return (
    <div className="flex flex-col space-y-8">
      {/* Private Profile Toggle */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-medium text-gray-900">
            Private profile
          </h3>
        </div>
      </div>

      {/* Avatar Section */}
      <div className="space-y-4">
        <h3 className="text-base font-medium text-gray-900">Avatar</h3>
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarImage
              src="/professional-woman-dark-hair.png"
              alt="Profile avatar"
            />
            <AvatarFallback>SB</AvatarFallback>
          </Avatar>
          <div className="text-sm text-gray-500">Use 800X800 px (PNG/JPG)</div>
        </div>
      </div>

      {/* Portfolio Link */}
      <div className="space-y-3">
        <h3 className="text-base font-medium text-gray-900">Portfolio link</h3>
        <div className="relative">
          <Input
            value={portfolioLink}
            onChange={(e) => setPortfolioLink(e.target.value)}
            className="pr-10 bg-gray-50 border-gray-200"
          />
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
          >
            <Edit3 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Display Name */}
      <div className="space-y-3">
        <h3 className="text-base font-medium text-gray-900">Display name</h3>
        <Input
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="bg-gray-50 border-gray-200"
        />
      </div>
    </div>
  );
};

export default ProfileConfiguration;
