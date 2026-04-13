import { useState, useEffect } from 'react'
import {
  getLocationCity,
  getWeatherByCity,
  getWeatherByCoords,
  getForecastByCoords,
  getCityOptions
} from '../services/weatherApi.jsx'

const DEFAULT_CITY = 'Madrid'

export function useWeather() {
  const [query, setQuery] = useState('')
  const [cityOptions, setCityOptions] = useState([])
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

  // Modificado: Ahora busca opciones en lugar de disparar el clima directamente
  const handleSearch = async (e) => {
    e.preventDefault()
    const city = query.trim()
    if (!city) return
    
    setLoading(true)
    try {
      setError('')
      const options = await getCityOptions(city)
      if (options.length === 0) {
        setError('No se encontró la ciudad.')
        setCityOptions([])
      } else {
        setCityOptions(options)
      }
    } catch (err) {
      setError('Error al buscar ciudades.')
    } finally {
      setLoading(false)
    }
  }

  // Nueva función para cargar el clima cuando el usuario elige una opción
  const handleSelectCity = async (lat, lon, name) => {
    setCityOptions([])
    setQuery('')
    setLoading(true)
    setLocationCity(name)
    try {
      const data = await getWeatherByCoords(lat, lon)
      const fData = await getForecastByCoords(lat, lon)
      setWeather(data)
      setForecast(fData)
    } catch (err) {
      setError('Error al obtener el clima.')
    } finally {
      setLoading(false)
    }
  }

  const handleCurrentLocation = () => {
    setLoading(true)
    setCityOptions([])
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords
      const data = await getWeatherByCoords(latitude, longitude)
      const fData = await getForecastByCoords(latitude, longitude)
      setWeather(data)
      setForecast(fData)
      setLocationCity(data.name)
      setLoading(false)
    }, () => {
      setError('Error de ubicación.')
      setLoading(false)
    })
  }

  return {
    query, setQuery, weather, forecast, loading, error,
    locationCity, unit, setUnit, handleSearch, handleCurrentLocation,
    cityOptions, handleSelectCity
  }
}