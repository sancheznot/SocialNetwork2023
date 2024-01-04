"use client";
import { Button, Input, Spinner } from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import FileDropzone from "./FileDropzone";
import GoBackButton from "@/components/Admin/GoBackButton";

const UpFeedPhotos = () => {
  const { data: session } = useSession();

  const router = useRouter();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [image, setImage] = useState(null);
  const [userId, setUserId] = useState(null);
  const [title, setTitle] = useState("");
  const [uploading, setUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [photoCategory, setPhotoCategory] = useState(null);

  const [uploadCategory, setUploadCategory] = useState(false);

  useEffect(() => {
    if (session) {
      setUserId(session?.user._id);
    }
  }, [session]);

  useEffect(() => {
    const getCategories = async () => {
      setUploadCategory(true);
      const res = await axios.get("/api/user/categories");
      setCategories(res.data.categories);
      setTimeout(() => {
        setUploadCategory(false);
      }, 1000);
    };
    getCategories();
  }, []);

  // It create a new publication with the photo uploaded and user id
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      return;
    }
    console.log(title, image, userId);
    const data = await axios.post("/api/user/uploads/publication", {
      title: title,
      url: image,
      user: userId,
      category: photoCategory,
    });
    setUploading(true);
    if (data.status === 200) {
      setSuccess(data.data.message);
      setError("");
      setTitle("");
      setImage(null);
      setUploading(false);
      router.push("/dashboard");
    } else {
      setError(data.data.message);
    }
  };

  // It upload the photo to AWS S3
  const UploadPhoto = async (files) => {
    console.log(files);
    // get file from input

    // const file = e.target.files[0];
    if (!files) {
      return;
    }
    const formData = new FormData();
    formData.append("file", files);
    setUploading(true);
    try {
      const res = await axios.post("/api/user/uploads/photos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setImage(res.data.links[0]);
      setUploading(false);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="w-full col-span-12 h-[calc(100vh-5rem)] dark:bg-gradient-to-tl flex flex-col justify-center items-center dark:from-photeradark-950 dark:via-photeradark-800 dark:to-photeradark-400 p-2 rounded-l-lg text-3xl">
      {uploadCategory ? (
        <Spinner size="lg" />
      ) : (
        <>
          <h3>{error}</h3>
          <h3>{success}</h3>
          <form className="w-5/12 md:w-11/12 flex flex-col justify-center items-center gap-5">
            <Input
              type="text"
              label="Title"
              value={title}
              maxLength={50}
              minLength={1}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <FileDropzone onFileChange={UploadPhoto} uploading={uploading} />
            <div className="grid grid-cols-12 place-items-center gap-x-3">
              <h4 className="col-span-12 font-extralight text-3xl">
                Photos categories
              </h4>
              <div className="col-span-3 w-full mx-2">
                <select
                  name="category"
                  value={photoCategory}
                  onChange={(e) => {
                    setPhotoCategory(e.target.value);
                  }}>
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <Button
              color="primary"
              isLoading={uploading}
              onClick={handleSubmit}
              className="text-lg">
              Posted
            </Button>
          </form>
        </>
      )}
      <GoBackButton />
    </div>
  );
};

export default UpFeedPhotos;
