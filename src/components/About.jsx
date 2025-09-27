import background from "../assets/background.png";
import closet from "../assets/closet.svg";
import clothes from "../assets/clothes.svg";
import weather from "../assets/weather.svg";
import arrow from "../assets/arrow.svg";
import {Navbar} from "./Navbar";


export const About = () => {
  return (
    <div
      className="h-screen w-full bg-no-repeat bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${background})` }}
    >

   <Navbar />
   <div className="flex flex-col items-center gap-y-20 p-10">

      <h1 className="text-4xl text-white font-extrabold mt-10">
        How WEARther Works
      </h1>
      <div className="flex justify-center gap-x-5">
        <div className="h-90 w-75 rounded-2xl bg-[#BFD7ED] flex flex-col items-center p-5 border border-black hover:cursor-pointer hover:scale-105 hover:opacity-80">
          <img src={closet} />

          <h1 className="text-xl font-bold text-black text-center mb-5">Upload your closet</h1>
          <p className="text-medium font-semibold text-black text-center">
            Take full control of your style by uploading your own wardrobe. Mix
            and match your actual clothes to get personalized outfit ideas using
            what you already own.
          </p>
        </div>
        <img src={arrow} />

        <div className="h-90 w-75 rounded-2xl bg-[#BFD7ED] flex flex-col items-center p-5 hover:cursor-pointer hover:scale-105 hover:opacity-80">
          <img src={clothes} />

          <h1 className="text-xl font-bold text-black text-center mb-5">Choose your occasion</h1>
          <p className="text-medium font-semibold text-black text-center">
            Heading to work, a party, the gym, or a cozy day in? Select your
            occasion, and we’ll tailor your outfit recommendations to match the
            vibe and setting perfectly.
          </p>
        </div>
        <img src={arrow} />

        <div className="h-90 w-75 rounded-2xl bg-[#BFD7ED] flex flex-col items-center p-5 hover:cursor-pointer hover:scale-105 hover:opacity-80">
          <img src={weather} />

          <h1 className="text-xl font-bold text-black text-center mb-5">
            Generate your outfit based on the weather
          </h1>
          <p className="text-medium font-semibold text-black text-center">
            No more guessing what to wear! We check your local weather and
            suggest the perfect outfit to keep you comfortable, stylish, and
            ready for the day.{" "}
          </p>
        </div>
      </div>
      </div>
    </div>
  );
};
