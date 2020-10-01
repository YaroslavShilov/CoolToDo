import React from "react";

import "./Badge.scss";

type Props = {
  icon?: React.ReactNode;
  color?: string;
  modificator?: string;
};

const Badge: React.FC<Props> = ({ icon, color, modificator }) => {
  return icon ? (
    <span className={`badge ${modificator || ""}`}>{icon}</span>
  ) : (
    <span className={"badge __circle"} style={{ backgroundColor: color }} />
  );
};

export default Badge;
