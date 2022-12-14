import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useContext, useRef } from "react";
import { AuthContext, useAuthContext } from "../../context/AuthContext";
import { EyeSlashIcon, EyeIcon, UserIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

function login() {
  const { isLoggedIn, errMessage, login } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn]);

  //Handle show password
  const [showPassword, setShowPassword] = useState(false);
  function toggleShowPassword() {
    setShowPassword((prev) => !prev);
  }

  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    login(emailRef.current?.value, passRef.current?.value);
  }

  return (
    <div className="w-screen h-screen flex  ">
      <div className="bg-zinc-700 h-full hidden sm:flex sm:w-1/2 lg:w-7/12">
        <img src="/scenery.jpg" alt="" className="h-full object-cover " />
      </div>
      <div className="w-full sm:w-1/2 lg:w-5/12 bg-zinc-800 flex justify-center items-center">
        <div className="w-full h-4/5 px-2 flex flex-col justify-center items-center text-zinc-300 ">
          <Head>
            <title>Login</title>
          </Head>
          <div className="text-3xl font-extrabold text-zinc-200">
            <UserIcon className="h-12 text-orange-400" />
          </div>
          <p className="text-zinc-300 font-semibold mt-10 text-lg">
            Welcome to <span className="text-orange-400">DNotebook</span>
          </p>

          {/* Show errorr message if wrong username or password  */}
          {errMessage.length > 0 ? (
            <p className="bg-red-600 px-3">{errMessage}</p>
          ) : (
            ""
          )}

          <form action="" className="flex flex-col gap-y-2 w-4/5 mt-6">
            <div className="w-full flex flex-col">
              <label className="text-[0.8em] text-zinc-400">Email</label>
              <input
                type="text"
                name="email"
                ref={emailRef}
                defaultValue="john@email.com"
                className="bg-transparent border-b-[1px] border-zinc-500 text-zinc-300 outline-none "
              />
            </div>

            <div className="w-full flex flex-col relative mt-2">
              <p className="text-[0.8em] text-zinc-400">Password</p>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="bg-transparent border-b-[1px] border-zinc-500 text-zinc-300 outline-none"
                ref={passRef}
                defaultValue="john"
              />
              <div
                onClick={toggleShowPassword}
                className="cursor-pointer absolute right-0 bottom-1 "
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5" />
                ) : (
                  <EyeIcon className="h-5" />
                )}
              </div>
            </div>

            <a href="#" className="self-end text-zinc-400 mt-2 text-sm">
              Forgot Password?
            </a>

            <button
              className="bg-zinc-200 text-zinc-900 rounded-full py-1 hover:bg-zinc-300 w-1/2 self-center mt-4"
              onClick={onSubmit}
            >
              Sign in
            </button>
          </form>

          <hr className="w-3/5 mt-auto border-zinc-500" />
          <div className="mt-2 text-sm">
            Don't Have an Account?{" "}
            <Link
              href="/auth/register"
              className="text-orange-400 border-zinc-400 cursor-pointer border-b-2 font-semibold "
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default login;
