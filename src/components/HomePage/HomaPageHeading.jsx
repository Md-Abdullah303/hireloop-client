import React from "react";

const HomaPageHeading = ({ data }) => {
  return (
    <div className="space-y-2 text-center px-3">
      <div className="flex items-center justify-center gap-3">
        <div className="bg-purple-400 w-0.5 h-0.5 p-1"></div>
        <h3 className={`font-space_mono text-[14px] md:text-[16px]`}>
          {data.top}
        </h3>
        <div className="bg-purple-400 w-0.5 h-0.5 p-1"></div>
      </div>
      <p className="font-bold text-4xl">{data.p1}</p>
      <p className="font-bold text-4xl">{data.p2}</p>
    </div>
  );
};

export default HomaPageHeading;
