import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
} from "@nextui-org/react";
import axios from "axios";

export default function CardCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get("/api/user/categories", {
        headers:{
          "cache-control": "no-cache",
        }
      });
      console.log(res);
      setCategories(res.data.categories);
    };
    getCategories();
  }, []);

  return (
    <div className="max-w-prose ml-4 gap-2 grid grid-cols-12 ">
      <h2 className="col-span-12 font-light">Categories</h2>
      {categories.map((category) => (
        <Card
          key={category._id}
          className="col-span-3 sm:col-span-4 h-[200px] dark:bg-gradient-to-tl from-photeradark-800 to-photeradark-400">
          <CardHeader className="absolute z-10 top-1 flex-col  !items-end h-full justify-end">
            <div className="dark:bg-black/70 w-full rounded-xl p-2 flex flex-col items-end justify-end">
              <p className="text-tiny text-photeradark-200 uppercase font-bold">
                {category.name}
              </p>
              <h4 className="text-white font-medium first-letter:uppercase text-large">
                {category.description}
              </h4>
            </div>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src={category.imgURL}
          />
        </Card>
      ))}
    </div>
  );
}
