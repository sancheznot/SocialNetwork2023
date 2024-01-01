import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
} from "@nextui-org/react";

export default function CardCategories() {
  return (
    <div className="max-w-prose ml-4 gap-2 grid grid-cols-12 grid-rows-2 ">
      <Card className="col-span-3 sm:col-span-4 h-[200px] dark:bg-gradient-to-tl from-photeradark-800 to-photeradark-400">
        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
          <p className="text-tiny text-photeradark-200 uppercase font-bold">
            What to watch
          </p>
          <h4 className="text-white font-medium text-large">
            Stream the Acme event
          </h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Card background"
          className="z-0 w-full h-full object-cover"
          src="/images/card-example-4.jpeg"
        />
      </Card>
      <Card className="col-span-3 sm:col-span-4 h-[200px] dark:bg-gradient-to-tl from-photeradark-800 to-photeradark-400">
        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">
            Plant a tree
          </p>
          <h4 className="text-white font-medium text-large">
            Contribute to the planet
          </h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Card background"
          className="z-0 w-full h-full object-cover"
          src="/images/card-example-3.jpeg"
        />
      </Card>
      <Card className="col-span-3 sm:col-span-4 h-[200px] dark:bg-gradient-to-tl from-photeradark-800 to-photeradark-400">
        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">
            Supercharged
          </p>
          <h4 className="text-white font-medium text-large">
            Creates beauty like a beast
          </h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Card background"
          className="z-0 w-full h-full object-cover"
          src="/images/card-example-2.jpeg"
        />
      </Card>
      <Card className="col-span-3 sm:col-span-4 h-[200px] dark:bg-gradient-to-tl from-photeradark-800 to-photeradark-400">
        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">
            Supercharged
          </p>
          <h4 className="text-white font-medium text-large">
            Creates beauty like a beast
          </h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Card background"
          className="z-0 w-full h-full object-cover"
          src="/images/card-example-2.jpeg"
        />
      </Card>
    </div>
  );
}
