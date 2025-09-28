// OutfitDisplay.jsx
import { useEffect, useState } from "react";
import supabase from "../helper/supabaseClient";

export const OutfitDisplay = ({ outfit }) => {
  const [publicUrl, setPublicUrl] = useState("");

  useEffect(() => {
    if (!outfit?.image_data) return;

    // Get public URL from Supabase storage
    const { data, error } = supabase
      .storage
      .from("clothes") // your bucket name
      .getPublicUrl(outfit.image_data);

    if (error) console.error("Supabase image error:", error);
    else setPublicUrl(data.publicUrl);
  }, [outfit]);

  if (!outfit) return null;

  return (
    <div className="mt-6 flex flex-col items-center bg-[#274472]">
      {publicUrl ? (
        <img
          src={publicUrl}
          alt={outfit.clothing_type}
          className="w-40 h-auto rounded-lg shadow-md"
        />
      ) : (
        <div className="w-40 h-40 bg-gray-200 flex items-center justify-center">
          Loading image...
        </div>
      )}
      <p className="font-semibold mt-2 text-white">{outfit.clothing_type}</p>
      <p className="text-white">{outfit.dress_code}</p>
    </div>
  );
};
