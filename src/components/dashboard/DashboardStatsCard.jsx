import React from "react";

const StatCard = ({ icon: Icon, title, value, className = "" }) => {
  return (
    <div
      className={`flex flex-col justify-between bg-[#18181b] border border-[#27272a] rounded-2xl p-6 min-h-[160px] w-full transition-all hover:border-[#3f3f46] ${className}`}
    >
      {/* Icon Container */}
      <div className="flex items-center justify-center bg-[#27272a] text-zinc-400 rounded-xl h-12 w-12 mb-6">
        {Icon && <Icon className="w-6 h-6" />}
      </div>

      {/* Content */}
      <div className="space-y-2">
        <p className="text-zinc-400 text-sm font-medium tracking-wide">
          {title}
        </p>
        <h3 className="text-white text-3xl font-semibold tracking-tight">
          {value}
        </h3>
      </div>
    </div>
  );
};

export default StatCard;
