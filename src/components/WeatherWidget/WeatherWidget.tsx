import './WeatherWidget.scss';

import { Box, Typography } from '@mui/material';
import { FC, useCallback, useEffect, useState } from 'react';

import AcUnitIcon from '@mui/icons-material/AcUnit';
import CloudIcon from '@mui/icons-material/Cloud';
import GrainIcon from '@mui/icons-material/Grain';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

interface WeatherProps {
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

const KYIV_LOCATION = { lat: 50.4333, lon: 30.5167 };

const WeatherWidget: FC = () => {
  const [weather, setWeather] = useState<WeatherProps | null>(null);
  const [location, setLocation] = useState(KYIV_LOCATION);
  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      });
    } else {
      setLocation(KYIV_LOCATION);
      console.log('Location access denied, using Kyiv as default.');
    }

    const today = new Date();

    setDate({
      formattedDate: today.toLocaleDateString(undefined, { month: 'long', day: 'numeric' }),
      dayOfWeek: today.toLocaleDateString(undefined, { weekday: 'long' }),
    });
  }, [location]);

  const fetchWeather = useCallback(async () => {
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${API_KEY}`,
      );

      if (!response.ok) {
        setWeather(null);
        throw new Error('Failed to fetch weather data');
      }

      const data = await response.json();
      setWeather(data);
      localStorage.setItem('weather', JSON.stringify(data));
    } catch (error) {
      console.warn('Error fetching weather data:', error);
      const cachedWeather = localStorage.getItem('weather');
      if (cachedWeather) setWeather(JSON.parse(cachedWeather));
    }
  }, [location]);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

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
    <Box sx={{ p: 3, ml: 'auto', mt: 2 }} className="weather box">
      <Typography textTransform="uppercase">Weather widget</Typography>
      <Typography variant="h3" className="date">
        {date?.formattedDate}
      </Typography>
      <p>{date?.dayOfWeek}</p>
      {weather ? (
        <>
          <Typography variant="h2">
            {Math.round(weather.main.temp)}
            <sup>°C</sup>
            {getWeatherIcon(weather.weather[0].description)}
          </Typography>
          <p className="location">
            {weather.name}, {weather.sys.country}
          </p>
        </>
      ) : (
        <p className="no-data">No weather data available...</p>
      )}
    </Box>
  );
};

export default WeatherWidget;
