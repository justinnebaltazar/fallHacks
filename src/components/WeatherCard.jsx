import { useEffect, useState } from "react"

export const WeatherCard = () => {
    /* fetch weather data and display 5 widget cards */
    const [forecast, setForecast] = useState([])
    const [loading, setLoading] = useState(true)
    const WEATHER_KEY = import.meta.env.VITE_WEATHER_KEY
    const CITY = 'Vancouver'
    const LATITUDE = 49.282795870243696
    const LONGITUDE = -123.1293997484125

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

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                setLoading(true)
                const res = await fetch(
                    `https://weather.googleapis.com/v1/forecast/days:lookup?key=${WEATHER_KEY}` +
                    `&location.latitude=${LATITUDE}` +
                    `&location.longitude=${LONGITUDE}` +
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
    }, []);

    if (loading) {
        return <div className="text-center">Loading weather...</div>
    }

    return (
        <div className="grid grid-cols-5 gap-4">
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
                    >
                        <p className="font-bold">{dateStr}</p>
                        <p>{minTemp}°C – {maxTemp}°C</p>
                        <p className="capitalize">{description}</p>
                        <span className="text-4xl">{emoji}</span>
                    </div>
                );
            })}
        </div>
    );
}