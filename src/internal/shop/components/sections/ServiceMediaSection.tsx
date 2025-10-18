import { Media } from "@/types/MediaFile";
import React from "react";

interface Props {
  medias: Media[];
}

const ServiceMediaSection: React.FC<Props> = ({ medias }) => {
  return (
    <div className="hidden lg:flex flex-col gap-4">
      {medias.map((m, k) => (
        <div key={k} className="w-full">
          <img src={m.url} alt="" className="object-cover w-full rounded-4xl shadow" />
        </div>
      ))}
    </div>
  );
};

export default ServiceMediaSection;
