"use client";
import axios from "axios";
import React, { useState } from "react";
import GoBackButton from "../GoBackButton";
import { Button, Input } from "@nextui-org/react";
import FileDropzone from "@/components/Dashboard/PhotoUploads/FileDropzone";

const NewCategories = () => {
  const [categories, setCategories] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  // AWS S3
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (categories === "" || description === "") {
      setError("Please enter all fields");
      setSuccess("");
      setTimeout(() => {
        setError("");
        setSuccess("");
      }, 2000);
      return;
    }
    const categoriesLowCase = categories.toLowerCase();
    const descriptionLowCase = description.toLowerCase();

    const data = await axios.post("/api/admin/categories", {
      categoryname: categoriesLowCase,
      description: descriptionLowCase,
      imgURL: image,
    });
    if (data.status === 400) {
      setError(data.data.message);
      setSuccess("");
    }
    if (data.status === 200) {
      setSuccess(data.data.message);
      setError("");
      setCategories("");
      setImage(null);
      setDescription("");
    }
    setTimeout(() => {
      setError("");
      setSuccess("");
    }, 2000);
  };

  // It upload the photo to AWS S3
  const UploadPhoto = async (files) => {
    if (image) {
      if (image.length > 1) {
        setImage(null);
      }
    }
    // get file from input

    if (!files) {
      return;
    }
    const formData = new FormData();
    formData.append("file", files);
    setUploading(true);
    try {
      const res = await axios.post(
        "/api/admin/uploads/photocategory",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setImage(res.data.links[0]);
      setUploading(false);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="w-full h-[calc(100vh-5rem)] flex flex-col  items-center dark:bg-gradient-to-tl dark:from-photeradark-950 dark:via-photeradark-800 dark:to-photeradark-400 p-2 rounded-l-lg ">
      <h1 className="self-start text-3xl font-light">New Categories</h1>

      <div className="h-full w-full flex justify-center items-start sm:mt-2">
        <div className="dark:bg-photeradark-200 w-7/12 sm:w-11/12 flex justify-center items-start rounded-lg text-photeradark-950">
          <form className="w-5/12 sm:w-11/12 flex flex-col gap-4 justify-center mt-4 text-2xl">
            <label htmlFor="name" className="text-lg">
              Category name
            </label>
            <Input
              type="text"
              label="Category name"
              className="dark:text-white"
              value={categories}
              onChange={(e) => {
                setCategories(e.target.value);
              }}
            />
            <Input
              type="text"
              label="Description"
              name="description"
              minLength={2}
              maxLength={20}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              className="dark:text-white"
            />
            <FileDropzone onFileChange={UploadPhoto} uploading={uploading} />
            <Button
              onClick={handleSubmit}
              color="primary"
              size="md"
              isLoading={uploading}>
              Create
            </Button>
            <div className="mb-2">
              {error && (
                <div className="bg-red-500 p-1 text-base rounded-md flex justify-center items-center">
                  {error}
                </div>
              )}
              {success && (
                <div className="bg-green-500 p-1 text-base rounded-md flex justify-center items-center">
                  {success}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
      <GoBackButton />
    </div>
  );
};

export default NewCategories;
