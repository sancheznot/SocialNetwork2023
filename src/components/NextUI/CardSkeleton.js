import React from "react";
import { Button, Skeleton } from "@nextui-org/react";
import { useParams, usePathname } from "next/navigation";

export const CardSkeleton = () => {
  const pathname = usePathname();
  const params = useParams();

  let arr = new Array(15).fill(0);

  if (pathname === `/categories/${params.id}`) {
    arr = new Array(10).fill(0);
  }
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

          <Skeleton className=" p-2 ml-2 mt-2 h-7 w-16 rounded-lg" />
          <div className="absolute w-full  sm:top-52 top-48 bg-transparent p-1 flex flex-col justify-center items-center">
            <Skeleton className="flex rounded-full w-12 h-12" />
            <Skeleton className="h-3 w-5/12 rounded-lg" />
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
