import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import CardCategories from "./Categories/CardCategories";

const CategoriesDash = () => {
  const [feed, setFeed] = useState([]);
  const [users, setUsers] = useState([]);

 

  return (
    <div className=" col-span-9 sm:col-span-12 sm:order-2">
      <CardCategories/>
    </div>
  );
};

export default CategoriesDash;
