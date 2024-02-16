import GoBackButton from "@/components/Admin/GoBackButton";
import { Button, Input, User } from "@nextui-org/react";
import axios from "axios";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const UsernameUpdate = ({ username }) => {
  const router = useRouter();

  const [userId, setUsername] = useState(username || "");
  const [usernameToUpdate, setusernameToUpdate] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!userId) return;
    const getData = async () => {
      const data = await axios.get(`/api/user/update/${userId}/username`);
      setusernameToUpdate(data.data.user.username);
    };
    getData();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (usernameToUpdate === "") {
      setError("Please enter all fields");
      setSuccess("");
      setTimeout(() => {
        setError("");
        setSuccess("");
      }, 2000);
      return;
    }
    if(usernameToUpdate.includes(" ")){
        setError("Please use a valid username, don't use spaces");
        setSuccess("");
        setTimeout(() => {
            setError("");
            setSuccess("");
        }, 2000);
        return;
    }
    if (usernameToUpdate.length < 3) {
      setError("Please use more than 3 characters");
      setSuccess("");
      setTimeout(() => {
        setError("");
        setSuccess("");
      }, 2000);
      return;
    }
    if (usernameToUpdate.length > 20) {
      setError("Please use less than 20 characters");
      setSuccess("");
      setTimeout(() => {
        setError("");
        setSuccess("");
      }, 2000);
      return;
    }
    const usernameLowerCase = usernameToUpdate.toLowerCase();
    const data = await axios.post(`/api/user/update/${username}/username`, {
      username: usernameLowerCase,
    });
    if (data.status === 400) {
      setError(data.data.message);
      setSuccess("");
      return;
    }
    if (data.status === 202) {
      console.log("aqui");
      setSuccess(data.data.message);
      setError("");
      return;
    }
    if (data.status === 200) {
      setSuccess(data.data.message);
      setError("");
      setTimeout(() => {
        signOut();
      }, 1000);
    }
  };

  return (
    <div className="w-full h-[calc(100vh-5rem)] flex flex-col  items-center dark:bg-gradient-to-tl dark:from-photeradark-950 dark:via-photeradark-800 dark:to-photeradark-400 p-2 rounded-l-lg ">
      <h1 className="self-start text-3xl font-light">Edit username center</h1>

      <div className="h-full w-full flex justify-center items-start sm:mt-2">
        <div className="dark:bg-photeradark-200 w-7/12 sm:w-11/12 flex justify-center items-start rounded-lg text-photeradark-950">
          <form className="w-5/12 sm:w-11/12 flex flex-col gap-4 justify-center mt-4 text-2xl">
            <label htmlFor="name" className="text-lg">
              Edit
            </label>
            <Input
              type="text"
              label="username"
              required
              minLength={3}
              maxLength={20}
              className="dark:text-white"
              value={usernameToUpdate}
              onChange={(e) => {
                setusernameToUpdate(e.target.value);
              }}
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

export default UsernameUpdate;
