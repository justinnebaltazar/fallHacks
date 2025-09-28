import { useEffect, useState } from "react"
import { OutfitDisplay } from "./OutfitDisplay"
import supabase from "../helper/supabaseClient"

export const WeatherCard = () => {
    /* fetch weather data and display 5 widget cards */
    const [forecast, setForecast] = useState([])
    const [loading, setLoading] = useState(true)
    const [latitude, setLatitude] = useState(null)
    const [longitude, setLongitude] = useState(null)
    const [selectedOutfit, setSelectedOutfit] = useState(null)

    const WEATHER_KEY = import.meta.env.VITE_WEATHER_KEY

    const iconMap = {
        CLEAR_DAY: "☀️",
        CLEAR_NIGHT: "🌙",
        PARTLY_CLOUDY_DAY: "⛅",
        PARTLY_CLOUDY_NIGHT: "🌤️",
        CLOUDY: "☁️",
        RAIN: "🌧️",
        SNOW: "❄️",
        THUNDERSTORM: "⛈️",
        LIGHT_RAIN: "🌧️"
    };

    function success(pos) {
        setLatitude(pos.coords.latitude);
        setLongitude(pos.coords.longitude); 
    }

    function errors(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.permissions
            .query({name: "geolocation"})
            .then(function(result) {
                console.log(result)
                if (result.state === "granted") {
                    navigator.geolocation.getCurrentPosition(success, errors);
                } else if (result.state === "prompt") {
                    navigator.geolocation.getCurrentPosition(success, errors);
                } else {
                    // show message to say we need location
                }
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }, [])

    useEffect(() => {
        if (latitude && longitude) {
            const fetchWeather = async () => {
            try {
                setLoading(true)
                const res = await fetch(
                    `https://weather.googleapis.com/v1/forecast/days:lookup?key=${WEATHER_KEY}` +
                    `&location.latitude=${latitude}` +
                    `&location.longitude=${longitude}` +
                    `&days=5&unitsSystem=METRIC&languageCode=en`
                );
                const data = await res.json();
                console.log("Full response:", data);

                const fiveDay = data.forecastDays?.slice(0, 5) || [];
                console.log("forecastDays:", fiveDay);

                setForecast(fiveDay);
            } catch (err) {
                console.error("Error fetching weather data:", err);
            } finally {
                setLoading(false)
            }
        };
        fetchWeather();
        }
    }, [latitude, longitude]);

    const [city, setCity] = useState("")

    useEffect(() => {
    if (latitude !== null && longitude !== null) {
        const fetchCity = async () => {
        try {
            const res = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${WEATHER_KEY}`
            )
            const data = await res.json()
            console.log("Geocoding:", data)

            const cityComponent = data.results[0]?.address_components.find((c) =>
            c.types.includes("locality")
            )
            setCity(cityComponent?.long_name || "Unknown location")
        } catch (err) {
            console.error("Error fetching city:", err)
            setCity("Unknown location")
        }
        }
        fetchCity()
    }
    }, [latitude, longitude])

    const pickOutfitCriteria = (day) => {
        console.log("picking outfit criteria")
        const maxTemp = day.maxTemperature?.degrees ?? 20;
        const description =
        typeof day.daytimeForecast?.weatherCondition?.description === "object"
            ? day.daytimeForecast?.weatherCondition?.description.text
            : day.daytimeForecast?.weatherCondition?.description ?? "";

        // Default criteria
        let criteria = { clothing_type: "top", dress_code: "casual" };

        if (maxTemp < 15) {
            criteria.sleeve_length = "long"; // sweater
        } else if (maxTemp >= 15 && maxTemp < 22) {
            criteria.sleeve_length = "short"; // t-shirt
        } else {
            criteria.sleeve_length = "short";
        }

        if (description.toLowerCase().includes("rain")) {
            criteria.clothing_type = "outerwear";
            criteria.pants_length = "long";
        }
        if (description.toLowerCase().includes("snow")) {
            criteria.clothing_type = "outerwear";
            criteria.pants_length = "long";
        }
        console.log("returning criteria:", criteria)
        return criteria;
    };

    const handleCardClick = async (day) => {
        console.log("Weather Card clicked");
        const criteria = pickOutfitCriteria(day);

        // Build Supabase query dynamically
        let query = supabase.from("outfit").select("*");

        // required filters
        query = query.eq("clothing_type", criteria.clothing_type)
                    .eq("dress_code", criteria.dress_code);

        // optional filters
        if (criteria.sleeve_length) query = query.eq("sleeve_length", criteria.sleeve_length);
        if (criteria.pants_length) query = query.eq("pants_length", criteria.pants_length);

        const { data: outfitData, error } = await query;

        if (error) {
            console.error("Error fetching outfit:", error);
            return;
        }

        console.log("checking for outfit data", outfitData);

        if (outfitData && outfitData.length > 0) {
            const randomIndex = Math.floor(Math.random() * outfitData.length);
            const chosenOutfit = outfitData[randomIndex];
            setSelectedOutfit(chosenOutfit);
            console.log("the selected outfit", chosenOutfit);
        }
    };



    if (loading) {
        return <div className="text-center">Loading weather...</div>
    }

    return (
        <div className="w-screen h-1/2 p-4 justify-center items-center bg-[#274472]" >
            <h2 className="text-xl font-bold text-center mb-4 text-white"> Weather Forecast for {city} </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {forecast.map((day, i) => {
                    if (!day.displayDate) return null; // skip invalid entries

                    const { year, month, day: dayNum } = day.displayDate;
                    const dateStr = new Date(year, month - 1, dayNum).toDateString();

                    const minTemp = day.minTemperature?.degrees ?? "--";
                    const maxTemp = day.maxTemperature?.degrees ?? "--";

                    const icon = day.daytimeForecast?.weatherCondition?.type;
                    const emoji = iconMap[icon] || "❓";

                    // extract text from description object
                    const descriptionObj = day.daytimeForecast?.weatherCondition?.description;
                    const description = typeof descriptionObj === 'object' && descriptionObj?.text 
                        ? descriptionObj.text 
                        : descriptionObj || "No data";

                    return (
                        <div
                            key={i}
                            className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center"
                            onClick={() => handleCardClick(day)}
                        >
                            <p className="font-bold">{dateStr}</p>
                            <p>{minTemp}°C – {maxTemp}°C</p>
                            <p className="capitalize">{description}</p>
                            <span className="text-4xl">{emoji}</span>
                        </div>
                    );
                })}
            </div>
                {selectedOutfit && <OutfitDisplay outfit={selectedOutfit} />}
        </div>
        
    );
}