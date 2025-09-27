import { useState, useEffect } from "react";
import supabase from "../helper/supabaseClient";

export const OutfitDisplay = ({ selectedOutfit }) => {
  const [outfit, setOutfit] = useState(null);

  useEffect(() => {
    const fetchOutfit = async () => {
      if (!selectedOutfit) return;
      const { data, error } = await supabase
        .from("outfit")
        .select("*")
        .eq("image_id", selectedOutfit)
        .single();

      if (error) {
        console.error("Error fetching outfit:", error);
      } else {
        setOutfit(data);
      }
    };

    fetchOutfit();
  }, [selectedOutfit]);

  if (!outfit) return null;

  // build public URL for bucket file
  const { data: { publicUrl } } = supabase
    .storage
    .from("clothes") // your bucket name
    .getPublicUrl(outfit.image_data);

  return (
    <div className="flex flex-col items-center mt-4">
      <img src={publicUrl} alt={outfit.clothing_type} className="w-40 h-auto" />
      <p>{outfit.dress_code}</p>
    </div>
  );
};
