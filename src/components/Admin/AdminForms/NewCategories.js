"use client";
import axios from "axios";
import React, { useState } from "react";

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
    }
    setTimeout(() => {
      setError("");
      setSuccess("");
    }, 2000);
  };

  return (
    <div>
      <h1>New Categories</h1>
      <div className="">
        {error && <div className="text-red-500">{error}</div>}
        {success && <div className="text-green-500">{success}</div>}
      </div>
      <form>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => {
            setCategories(e.target.value);
          }}
        />
        <button onClick={handleSubmit}>Save</button>
      </form>
    </div>
  );
};

export default NewCategories;
