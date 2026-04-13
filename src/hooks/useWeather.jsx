import { useState, useEffect } from 'react'
import {
  getLocationCity,
  getWeatherByCity,
  getWeatherByCoords,
  getForecastByCoords,
} from '../services/weatherApi.jsx'

const DEFAULT_CITY = 'Madrid'

export function useWeather() {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [locationCity, setLocationCity] = useState(DEFAULT_CITY)
  const [unit, setUnit] = useState('C')

  const loadWeather = async (city) => {
    try {
      setError('')
      const weatherData = await getWeatherByCity(city)
      setWeather(weatherData)
      const forecastData = await getForecastByCoords(weatherData.coord.lat, weatherData.coord.lon)
      setForecast(forecastData)
    } catch (err) {
      setError('No se encontró la ciudad.')
    }
  }

  useEffect(() => {
    const init = async () => {
      setLoading(true)
      try {
        const city = await getLocationCity()
        setLocationCity(city)
        await loadWeather(city)
      } catch {
        await loadWeather(DEFAULT_CITY)
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [])

  const handleSearch = async (e) => {
    e.preventDefault()
    const city = query.trim()
    if (!city) return
    setLoading(true)
    setLocationCity(city)
    await loadWeather(city)
    setLoading(false)
    setQuery('')
  }

  const handleCurrentLocation = () => {
    setLoading(true)
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords
      const data = await getWeatherByCoords(latitude, longitude)
      const fData = await getForecastByCoords(latitude, longitude)
      setWeather(data)
      setForecast(fData)
      setLocationCity(data.name)
      setLoading(false)
    }, () => setLoading(false))
  }

  return {
    query, setQuery, weather, forecast, loading, error,
    locationCity, unit, setUnit, handleSearch, handleCurrentLocation
  }
}