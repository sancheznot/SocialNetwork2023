"use client";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const UpFeedPhotos = () => {
  const { data: session } = useSession();

  const router = useRouter();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [image, setImage] = useState(null);
  const [userId, setUserId] = useState(null);
  const [title, setTitle] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (session) {
      setUserId(session?.user._id);
    }
  }, [session]);

  // It create a new publication with the photo uploaded and user id
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      return;
    }
    const data = await axios.post("/api/user/uploads/publication", {
      title: title,
      url: image,
      user: userId,
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
  const UploadPhoto = async (e) => {
    e.preventDefault();
    // get file from input
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
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
    <div>
      <h3>{error}</h3>
      <h3>{success}</h3>
      <form>
        <input
          value={title}
          type="text"
          placeholder="Write Something"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          maxLength={50}
          minLength={1}
        />
        <input
          type="file"
          name="file"
          accept="image/*"
          onChange={UploadPhoto}
          disabled={uploading}
        />
           <Button color="primary" isLoading={uploading} onClick={handleSubmit}>
      Posted
    </Button>
      </form>
    </div>
  );
};

export default UpFeedPhotos;
