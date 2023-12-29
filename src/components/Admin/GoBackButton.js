import React from "react";
import { useRouter } from "next/navigation";

const GoBackButton = () => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };
  return (
    <div className="self-start dark:bg-photeradark-900 bg-gray-300 p-4 flex justify-center items-center rounded-full">
      <button onClick={goBack} className="w-11 h-11">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-full h-full">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
      </button>
    </div>
  );
};

export default GoBackButton;
