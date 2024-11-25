import './WeatherWidget.scss';

import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import AcUnitIcon from '@mui/icons-material/AcUnit';
import CloudIcon from '@mui/icons-material/Cloud';
import GrainIcon from '@mui/icons-material/Grain';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

interface WeatherData {
  name: string;
  sys: {
    country: string;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
  };
}

interface Date {
  formattedDate: string;
  dayOfWeek: string;
}

const kyiv = { lat: 50.4333, lon: 30.5167 };

const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState(kyiv);
  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        () => {
          console.log('Location access denied, using Kyiv as default.');
        }
      );
    }

    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric',
    };
    const formattedDate = today.toLocaleDateString(undefined, options);
    const dayOfWeek = today.toLocaleDateString(undefined, { weekday: 'long' });
    setDate({ formattedDate, dayOfWeek });
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();
      setWeather(data);
    };
    fetchWeather();
  }, [location]);

  if (!weather) return <p>Loading weather...</p>;

  const getWeatherIcon = (description: string) => {
    switch (description.toLowerCase()) {
      case 'clear sky':
        return <WbSunnyIcon />;
      case 'few clouds':
      case 'scattered clouds':
      case 'broken clouds':
        return <CloudIcon />;
      case 'shower rain':
      case 'rain':
        return <GrainIcon />;
      case 'thunderstorm':
        return <ThunderstormIcon />;
      case 'snow':
        return <AcUnitIcon />;
      default:
        return <CloudIcon />;
    }
  };

  return (
    <Box sx={{ px: 3, py: 2 }} className='weather'>
      <Typography textTransform='uppercase'>Weather widget</Typography>
      <h3 className='date'>{date?.formattedDate}</h3>
      <p>{date?.dayOfWeek}</p>
      <h2>
        {Math.round(weather.main.temp)}
        <sup>°C</sup>
        {getWeatherIcon(weather.weather[0].description)}
      </h2>
      <p className='location'>
        {weather.name}, {weather.sys.country}
      </p>
      <div></div>
    </Box>
  );
};

export default WeatherWidget;
