"use client";
import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";

const Form = () => {
  const [errors, setErrors] = useState(null);
  const [success, setSuccess] = useState(null);

  const router = useRouter();
  const Pathname = usePathname();

  const handleSumit = async (e) => {
    e.preventDefault();
    const dataFromForm = new FormData(e.currentTarget);

    if (Pathname === "/register") {
      try {
        const res = await axios.post("/api/auth/signup", {
          username: dataFromForm.get("username"),
          email: dataFromForm.get("email"),
          name: dataFromForm.get("name"),
          lastname: dataFromForm.get("lastname"),
          password: dataFromForm.get("password"),
          art: dataFromForm.get("art"),
        });
        const resSignin = await signIn("credentials", {
          username: dataFromForm.get("username"),
          password: dataFromForm.get("password"),
          redirect: false,
        });
        setErrors(null);
        setSuccess(res.data.message);
        if (resSignin?.ok) {
          return router.push("/dashboard");
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          setSuccess(null);
          setErrors(error.response?.data.message);
        }
      }
    }
    if (Pathname === "/login") {
      try {
        const resSignin = await signIn("credentials", {
          username: dataFromForm.get("username"),
          password: dataFromForm.get("password"),
          redirect: false,
        });
        setErrors(null);
        if (resSignin?.ok) {
          setSuccess("Login success");
          return router.push("/dashboard");
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          setSuccess(null);
          setErrors(error.response?.data.message);
        }
      }
    }
  };
  return (
    <>
      <div className="flex flex-col justify-center w-6/12">
        <div className="flex justify-start items-center">
          {Pathname === "/login" ? (
            <h2 className="text-5xl p-2 ml-10">Sign In</h2>
          ) : (
            <h2 className="text-5xl p-2 ml-10">Sign Up</h2>
          )}
        </div>
        <div className="flex w-5/12 mt-28 ml-4">
          {errors && (
            <div className="bg-red-500 p-3 rounded-lg text-white w-full text-center">
              {errors}
            </div>
          )}
          {success && (
            <div className="bg-green-500 p-3 rounded-lg text-white w-full text-center">
              {success}
            </div>
          )}
        </div>
        <div className="flex flex-row w-full h-screen justify-around items-center">
          <form
            onSubmit={handleSumit}
            className="w-5/12 flex flex-col justify-start items-center text-black">
            {Pathname === "/login" ? (
              <>
                <label
                  htmlFor="username"
                  className="text-gray-400 text-md mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="border border-gray-300 rounded-lg p-2 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder={
                    Pathname === "/login"
                      ? "Enter your username"
                      : "Use a cool username!"
                  }
                />
                <label
                  htmlFor="password"
                  className="text-gray-400 text-md mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  className="border border-gray-300 rounded-lg p-2 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </>
            ) : (
              <>
                <label
                  htmlFor="username"
                  className="text-gray-400 text-md mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="border border-gray-300 rounded-lg p-2 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Use a cool username!"
                />
                <label htmlFor="email" className="text-gray-400 text-md mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="border border-gray-300 rounded-lg p-2 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Enter your email"
                />
                <label htmlFor="name" className="text-gray-400 text-md mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="border border-gray-300 rounded-lg p-2 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Enter your name"
                />
                <label
                  htmlFor="lastname"
                  className="text-gray-400 text-md mb-2">
                  Lastname
                </label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  className="border border-gray-300 rounded-lg p-2 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Enter your lastname"
                />
                <label
                  htmlFor="password"
                  className="text-gray-400 text-md mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  className="border border-gray-300 rounded-lg p-2 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
                <label htmlFor="art" className="text-gray-400 text-md mb-2">
                  What do you do?
                </label>
                <input
                  type="text"
                  id="art"
                  name="art"
                  placeholder="Actor, Singer"
                  className="border border-gray-300 rounded-lg p-2 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
                <i>
                  <strong className="text-sm text-gray-400">
                    Divide using comma (Actor, Singer)
                  </strong>
                </i>
              </>
            )}
            {Pathname === "/login" ? (
              <button className="bg-gray-300 p-2 mt-2 rounded-xl text-xl hover:bg-blue-500 hover:text-white text-black">
                Sign In
              </button>
            ) : (
              <button className="bg-gray-300 p-2 mt-2 rounded-xl text-xl hover:bg-blue-500 hover:text-white text-black">
                Sign Up
              </button>
            )}
          </form>
          <div className="flex flex-col">
            {Pathname === "/login" ? (
              <div className="w-full flex flex-col justify-center items-start">
                <h2 className="text-2xl p-2 ml-10">Sign in with google</h2>
                <button
                  onClick={() => signIn("google", { redirect: false })}
                  className="bg-gray-300 p-2 mt-2 ml-44 rounded-xl text-xl hover:bg-blue-500 hover:text-white text-black">
                  Sign In Google
                </button>
              </div>
            ) : (
              <div className="w-full flex flex-col justify-center items-start">
                <h2 className="text-2xl p-2 ml-10">Sign up with google</h2>
                <button
                  onClick={() => signIn("google", { redirect: false })}
                  className="bg-gray-300 p-2 mt-2 ml-44 rounded-xl text-xl hover:bg-blue-500 hover:text-white text-black">
                  Sign Up Google
                </button>
              </div>
            )}
            <div className="w-full flex flex-col justify-center items-start">
              <h2 className="text-2xl p-2 ml-10">Sign Out</h2>
              <button
                onClick={() => signOut()}
                className="bg-gray-300 p-2 mt-2 ml-44 rounded-xl text-xl hover:bg-red-500 hover:text-white text-black">
                SignOut
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
