import clouds from "../assets/clouds.svg";
import {Navbar} from "./Navbar";
import { Link } from "react-router-dom"



export const Home = () => {
    return (
        <div className="h-screen  bg-linear-to-b from-[#274472] to-[#8EA3D0] flex flex-col overflow-hidden">
             <Navbar/>
            <div className="flex">
            <div className="flex flex-col gap-y-5">

            <h1 className="font-bold text-6xl mt-45 ml-40 text-white max-w">Get personalized outfit ideas, powered by today’s weather.</h1>

            <Link to="/upload">
            <button className="bg-[#E2EBF4] rounded-2xl ml-40 h-10 w-1/2 hover:cursor-pointer hover:scale-105 hover:opacity-80">
                <p className="font-medium text-semibold">
                    Create an outfit now!
                </p>
            </button>
            </Link>
            </div>
         
        



            <img src={clouds}
             
></img>

            </div>


        </div>
    )
}