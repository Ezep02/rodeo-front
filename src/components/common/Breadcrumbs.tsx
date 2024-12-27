import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs: React.FC = () => {
  const location = useLocation();

  let currentLink: string = "";
  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb) => {
      currentLink += `/${crumb}`;
      return (
        <li className="" key={crumb}>
          <Link to={currentLink}>{crumb}</Link>
        </li>
      );
    });

  return (
    <div>
      <ul className="flex gap-1 text-zinc-50">{crumbs}</ul>
    </div>
  );
};

export default Breadcrumbs;
