import React from "react";
import {  Skeleton } from "@nextui-org/react";

export const CardSkeleton = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 , 14, 15];

  return (
    <>
      {arr.map((item) => (
        <div
          className="group bg-white rounded-lg overflow-hidden shadow-lg relative"
          key={item}>
          <div className="relative w-full h-60">
            <Skeleton className="rounded-lg h-full">
              <div className="h-full rounded-lg bg-default-300"></div>
            </Skeleton>
          </div>

          <div className="absolute w-full  sm:top-52 top-48 bg-transparent p-1 flex flex-col justify-center items-center">
            <Skeleton className="flex rounded-full w-12 h-12" />
            <Skeleton className="h-3 w-5/12 rounded-lg"/>
          </div>
          <div className="p-4 mt-5 sm:mt-6 xl:mt-3">
            <p className="text-gray-600 font-light text-lg text-justify">
              <Skeleton className="w-3/5 rounded-lg">
                <div className="h-3 w-10/12 rounded-lg bg-default-200"></div>
              </Skeleton>
            </p>
          </div>
        </div>
      ))}
    </>
  );
};
