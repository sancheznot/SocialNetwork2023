"use client";
import axios from "axios";
import React, { useState } from "react";
import GoBackButton from "../GoBackButton";

const NewCategories = () => {
  const [categories, setCategories] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (categories === "") {
      setError("Please enter a category name");
      setSuccess("");
      setTimeout(() => {
        setError("");
        setSuccess("");
      }, 2000);
      return;
    }
    const data = await axios.post("/api/admin/categories", {
      categoryname: categories,
    });
    if (data.status === 400) {
      setError(data.data.message);
      setSuccess("");
    }
    if (data.status === 200) {
      setSuccess(data.data.message);
      setError("");
      setCategories("");
    }
    setTimeout(() => {
      setError("");
      setSuccess("");
    }, 2000);
  };

  return (
    <div className="w-full h-[calc(100vh-5rem)] flex flex-col  items-center dark:bg-gradient-to-tl dark:from-photeradark-950 dark:via-photeradark-800 dark:to-photeradark-400 p-2 rounded-l-lg ">
      <h1 className="self-start text-3xl font-light">New Categories</h1>

      <div className="h-full w-full flex justify-center items-start">
        <div className="dark:bg-photeradark-200 w-7/12 flex justify-center items-start rounded-lg text-photeradark-950">
          <form className="w-5/12 flex flex-col gap-4 justify-center mt-4 text-2xl">
            
            <label htmlFor="name" className="text-lg">
              Category name
            </label>
            <input
              type="text"
              placeholder="Category name"
              value={categories}
              className="border-2 border-gray-500 dark:text-white rounded-lg p-2 text-xl focus:outline-none focus:ring-2 focus:ring-photeradark-300 focus:border-transparent"
              onChange={(e) => {
                setCategories(e.target.value);
              }}
            />
            <button
              onClick={handleSubmit}
              className="dark:bg-photeradark-900 bg-gray-300 dark:text-white  p-2 rounded-md mb-4">
              Create
            </button>
            <div className="mb-2">
              {error && <div className="bg-red-500 p-1 text-base rounded-md flex justify-center items-center">{error}</div>}
              {success && <div className="bg-green-500 p-1 text-base rounded-md flex justify-center items-center">{success}</div>}
            </div>
          </form>
        </div>
      </div>
      <GoBackButton />
    </div>
  );
};

export default NewCategories;
