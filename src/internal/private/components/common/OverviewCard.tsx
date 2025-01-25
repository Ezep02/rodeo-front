import React from "react";

type OverviewCardProps = {
  title: string;
  data: string | number;
};

const OverviewCard: React.FC<OverviewCardProps> = ({ title, data }) => {
  return (
    <article className="w-full h-full">
      <h2>{title}</h2>
 
      <p>{data}</p>
    </article>
  );
};

export default OverviewCard;
