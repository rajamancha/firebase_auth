import React from "react";

const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="border-2 border-gray-200 rounded-lg p-4 w-fit">
      {children}
    </div>
  );
};

export default Card;
