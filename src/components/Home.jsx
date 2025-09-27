import clouds from "../assets/clouds.svg";
import { Navbar } from "./Navbar";
import React, { useEffect, useState } from "react";
import { Upload } from "./Upload.jsx"

export const Home = () => {
  const [form, setForm] = useState(false);

  return (
    <div className="h-screen  bg-linear-to-b from-[#274472] to-[#8EA3D0] flex flex-col overflow-hidden">
      <Navbar />
      <div className="flex">
        <div className="flex flex-col gap-y-5">
          <h1 className="font-bold text-6xl mt-45 ml-40 text-white max-w">
            Get personalized outfit ideas, powered by today’s weather.
          </h1>

          <li>
            <button
              className="bg-[#E2EBF4] rounded-2xl ml-40 h-10 w-1/2 hover:cursor-pointer hover:scale-105 hover:opacity-80"
              onClick={() => setForm(true)}
            >
              <p className="font-medium text-semibold">Create an outfit now!</p>
            </button>
          </li>

        </div>
        <img src={clouds}></img>
      </div>
       {/* upload clothing pop up */}
       <Upload trigger={form} onClose={() => setShow(false)} onDone={() => setShow(false)} /> 

    </div>
  );
};
