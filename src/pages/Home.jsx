import { useEffect, useState } from 'react'
import {
  getLocationCity,
  getWeatherByCity,
  getWeatherByCoords,
  getForecastByCoords,
} from '../services/weatherApi'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import WeatherOverview from '../components/WeatherOverview'
import WeatherDetails from '../components/WeatherDetails'
import ForecastPanel from '../components/ForecastPanel'
import StatusMessage from '../components/StatusMessage'
import UnitToggle from '../components/UnitToggle'

const DEFAULT_CITY = 'Madrid'

function formatLocalDate(timestamp, timezone) {
  return new Date((timestamp + timezone) * 1000).toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
  })
}

export default function Home() {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [locationCity, setLocationCity] = useState(DEFAULT_CITY)
  const [unit, setUnit] = useState('C')

  useEffect(() => {
    const fetchLocationWeather = async () => {
      try {
        setLoading(true)
        setError('')
        const city = await getLocationCity()
        setLocationCity(city)
        await loadWeather(city)
      } catch (err) {
        setError('No se pudo obtener la ubicación. Cargando Madrid.')
        await loadWeather(DEFAULT_CITY)
      } finally {
        setLoading(false)
      }
    }

    fetchLocationWeather()
  }, [])

  const loadWeather = async (city) => {
    try {
      setError('')
      const weatherData = await getWeatherByCity(city)
      setWeather(weatherData)
      const forecastData = await getForecastByCoords(
        weatherData.coord.lat,
        weatherData.coord.lon,
      )
      setForecast(forecastData)
    } catch (err) {
      setWeather(null)
      setForecast([])
      setError('No se encontró la ciudad. Intenta con otro nombre.')
    }
  }

  const handleSearch = async (event) => {
    event.preventDefault()
    const city = query.trim()
    if (!city) return

    setLoading(true)
    setLocationCity(city)
    await loadWeather(city)
    setLoading(false)
    setQuery('')
  }

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocalización no disponible'))
        return
      }

      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
      })
    })
  }

  const loadWeatherByCoords = async (lat, lon) => {
    try {
      setError('')
      const weatherData = await getWeatherByCoords(lat, lon)
      setWeather(weatherData)
      const forecastData = await getForecastByCoords(lat, lon)
      setForecast(forecastData)
      setLocationCity(`${weatherData.name}, ${weatherData.sys.country}`)
    } catch (err) {
      setWeather(null)
      setForecast([])
      setError('No se pudo obtener el clima de tu ubicación actual.')
    }
  }

  const handleCurrentLocation = async () => {
    setLoading(true)
    setError('')

    try {
      const position = await getCurrentPosition()
      await loadWeatherByCoords(position.coords.latitude, position.coords.longitude)
    } catch (err) {
      try {
        const city = await getLocationCity()
        setLocationCity(city)
        await loadWeather(city)
      } catch (fallbackError) {
        await loadWeather(DEFAULT_CITY)
      }
    } finally {
      setLoading(false)
    }
  }

  const currentDate = weather ? formatLocalDate(weather.dt, weather.timezone) : ''

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto min-h-screen max-w-7xl px-6 py-8 lg:px-10">
        <Header locationCity={locationCity} />

        <div className="mt-8 grid gap-6 lg:grid-cols-[42%_1fr]">
          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-[2rem] bg-slate-950/95 p-6 shadow-2xl shadow-slate-950/50 ring-1 ring-white/5 backdrop-blur-xl">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
                  <div className="flex flex-wrap items-center gap-3">
                    <UnitToggle unit={unit} setUnit={setUnit} />
                    <button
                      type="button"
                      onClick={handleCurrentLocation}
                      className="rounded-3xl bg-slate-800 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-700"
                    >
                      Mi ubicación
                    </button>
                  </div>
                </div>

                {loading ? (
                  <StatusMessage type="loading" message="Cargando datos del clima..." />
                ) : error ? (
                  <StatusMessage type="error" message={error} />
                ) : weather ? (
                  <WeatherOverview weather={weather} unit={unit} currentDate={currentDate} />
                ) : null}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] bg-slate-950/95 p-6 shadow-2xl shadow-slate-950/50 ring-1 ring-white/5 backdrop-blur-xl">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Pronóstico</p>
                  <h2 className="mt-2 text-2xl font-semibold">Próximos días</h2>
                </div>
              </div>
              <ForecastPanel forecasts={forecast} unit={unit} />
            </div>

            <WeatherDetails weather={weather} unit={unit} />
          </div>
        </div>
      </div>
    </div>
  )
}
