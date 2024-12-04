import React from "react";

const ButtonDelay = ({ repeatOn, changeDelay }: { repeatOn: boolean; changeDelay: () => void }) => {
  return (
    <>
      <button onClick={changeDelay} className="bg-[#518389] w-16 h-8 rounded-full flex items-center">
        <div className={`w-6 h-6 ml-1 rounded-full ${repeatOn ? "translate-x-8 bg-green-300" : "bg-red-300"} transition-all`}></div>
      </button>
    </>
  );
};

export default ButtonDelay;
