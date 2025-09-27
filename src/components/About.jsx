import background from "../assets/background.png";

export const About = () => {
  return (
    <div
      className="h-screen w-full bg-no-repeat bg-cover bg-center flex flex-col items-center"
      style={{ backgroundImage: `url(${background})` }}
    >
        <h1 className="text-4xl text-white font-extrabold">How WEARther Works</h1>
        <div className="flex gap-y-2">
      
            <div className="h-90 w-75 rounded-2xl bg-[#BFD7ED] flex flex-col items-center">
                <h1 className="text-xl font-bold text-black">
                    Upload your closet
                </h1>
                <p className="text-medium font-semibold text-black">
                Take full control of your style by uploading your own wardrobe. Mix and match your actual clothes to get personalized outfit ideas using what you already own.
                </p>

            </div>
       
        

        </div>

    </div>
  );
};