import GoBackButton from "@/components/Admin/GoBackButton";
import { Button, Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const NamesFormUpdate = ({ username }) => {
  const router = useRouter();

  const [userId, setUsername] = useState(username || "");
  const [name, setName] = useState("");
  const [lastName, setlastName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!userId) return;
    const getData = async () => {
      const data = await axios.get(`/api/user/update/${userId}/name`);
      setName(data.data.user.name);
      setlastName(data.data.user.lastname);
    };
    getData();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === "" || lastName === "") {
      setError("Please enter all fields");
      setSuccess("");
      setTimeout(() => {
        setError("");
        setSuccess("");
      }, 2000);
      return;
    }

    if (name.length > 20 || lastName.length > 20) {
      setError("Please use less than 20 characters");
      setSuccess("");
      setTimeout(() => {
        setError("");
        setSuccess("");
      }, 2000);
      return;
    }
    if (name.length < 2 || lastName.length < 2) {
      setError("Please use more than 2 characters");
      setSuccess("");
      setTimeout(() => {
        setError("");
        setSuccess("");
      }, 2000);
      return;
    }

    const nameLowerCase = name.toLowerCase();
    const lastNameLowCase = lastName.toLowerCase();

    const data = await axios.post(`/api/user/update/${username}/name`, {
      name: nameLowerCase,
      lastname: lastNameLowCase,
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
      router.push(`/profile/${username}`);
    }, 1000);
  };

  return (
    <div className="w-full h-[calc(100vh-5rem)] flex flex-col  items-center dark:bg-gradient-to-tl dark:from-photeradark-950 dark:via-photeradark-800 dark:to-photeradark-400 p-2 rounded-l-lg ">
      <h1 className="self-start text-3xl font-light">
        Edit Names and Lastname of the user center
      </h1>

      <div className="h-full w-full flex justify-center items-start sm:mt-2">
        <div className="dark:bg-photeradark-200 w-7/12 sm:w-11/12 flex justify-center items-start rounded-lg text-photeradark-950">
          <form className="w-5/12 sm:w-11/12 flex flex-col gap-4 justify-center mt-4 text-2xl">
            <label htmlFor="name" className="text-lg">
              Edit
            </label>
            <Input
              type="text"
              label="name"
              required
              className="dark:text-white"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Input
              type="text"
              label="lastname"
              name="lastname"
              minLength={2}
              maxLength={20}
              value={lastName}
              onChange={(e) => {
                setlastName(e.target.value);
              }}
              className="dark:text-white"
            />
            <Button onClick={handleSubmit} color="primary" size="md">
              Update
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

export default NamesFormUpdate;
