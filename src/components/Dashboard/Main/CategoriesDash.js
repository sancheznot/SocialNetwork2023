import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import CardCategories from "./Categories/CardCategories";

const CategoriesDash = () => {
  const [feed, setFeed] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get("/api/user/userslist");
      setUsers(res.data);
    };
    const getFeed = async () => {
      const res = await axios.get("/api/user/uploads/publication");
      setFeed(res.data.photos);
    };
    getUser();
    getFeed();
  }, []);

  return (
    <div className=" col-span-9">
      <CardCategories/>
    </div>
  );
};

export default CategoriesDash;
