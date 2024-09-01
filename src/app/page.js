'use client'
import Link from "next/link";
import HashLoader from "react-spinners/HashLoader";
import { useState, useEffect } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000)
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <HashLoader color={"#ffffff"} loading={loading} size={30} />
        </div>
      ) : (
        <>
          <div className="flex justify-center flex-col gap-4 items-center text-white h-fit mt-3 mb-5 px-5 md:px-0">
            <div className="font-bold flex gap-6 md:gap-5 justify-center items-center md:text-7xl text-4xl mt-28">
              Get-Me-A-Burger
            </div>
            <p className="text-center">A crowdfunding platform for creators. Get funded by your fans and followers. Start now!</p>
            <div>
              

              
              <div className="flex flex-col justify-center items-center ">
                <Link href={'/profiles'}>
                  <button type="button" className="w-48 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Fund Raisers</button>
                </Link>
              </div>
            </div>
          </div>         

        </>
      )}
    </>
  );
}