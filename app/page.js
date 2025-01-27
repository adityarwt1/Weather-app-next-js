"use client";

// Import styles and React hooks
import { useState, useEffect } from "react";

export default function Page() {
  useEffect(() => {
    document.title = "Weather App - Check Your City's Weather";
  }, []);
  const [city, setCity] = useState(""); // State for user input
  const [weatherData, setWeatherData] = useState(null); // State for weather data
  const [error, setError] = useState(null); // State for errors

  const fetchWeatherData = async (cityName) => {
    const url = `https://open-weather13.p.rapidapi.com/city/${cityName}/EN`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "bebbed6279msh577a1cc10608997p11d4d1jsna377b87d5bc2",
        "x-rapidapi-host": "open-weather13.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error("City not found");
      const result = await response.json();
      setWeatherData(result); // Update state with weather data
      setError(null); // Clear any previous errors
    } catch (err) {
      setError(err.message);
      setWeatherData(null); // Clear previous data if there's an error
    }
  };

  const handleSearch = () => {
    if (city.trim()) {
      fetchWeatherData(city.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-900 text-white font-sans">
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center py-4 px-8 bg-blue-600 shadow-lg">
        <div className="text-4xl font-bold">Weather App</div>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search your city"
            className="p-2 rounded-lg text-black focus:ring-2 focus:ring-blue-400 w-72 bg-gray-200"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            autoFocus
          />
          <button
            className="px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded-lg shadow-md"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </nav>

      {/* Weather Result */}
      <div className="flex justify-center items-center mt-10">
        {error && (
          <div className="text-red-400 text-lg bg-red-900 p-4 rounded-lg shadow-lg">
            {error}
          </div>
        )}
        {weatherData && (
          <div className="bg-white text-black rounded-xl shadow-lg p-6 w-96">
            <h2 className="text-2xl font-bold mb-4 text-center">
              {weatherData.name}, {weatherData.sys.country}
            </h2>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold">Temperature:</h3>
                <p className="text-xl">{weatherData.main.temp}°C</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Humidity:</h3>
                <p className="text-xl">{weatherData.main.humidity}%</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">Wind Speed:</h3>
                <p className="text-xl">{weatherData.wind.speed} m/s</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Condition:</h3>
                <p className="text-xl capitalize">
                  {weatherData.weather[0].description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
