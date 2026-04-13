import axios from 'axios'

const OPENWEATHER_KEY = import.meta.env.VITE_OPENWEATHER_KEY
const IPINFO_KEY = import.meta.env.VITE_IPINFO_KEY

function ensureEnv(key, name) {
  if (!key) {
    throw new Error(`La variable de entorno ${name} no está definida.`)
  }
}

export async function getLocationCity() {
  ensureEnv(IPINFO_KEY, 'VITE_IPINFO_KEY')
  const response = await axios.get(`https://ipinfo.io/json?token=${IPINFO_KEY}`)
  return response.data.city || 'Madrid'
}

// Nueva función para obtener hasta 3 opciones de ciudades
export async function getCityOptions(query) {
  ensureEnv(OPENWEATHER_KEY, 'VITE_OPENWEATHER_KEY')
  const response = await axios.get('http://api.openweathermap.org/geo/1.0/direct', {
    params: {
      q: query,
      limit: 3,
      appid: OPENWEATHER_KEY,
    },
  })
  return response.data
}

export async function getWeatherByCity(city) {
  ensureEnv(OPENWEATHER_KEY, 'VITE_OPENWEATHER_KEY')
  const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      q: city,
      appid: OPENWEATHER_KEY,
      units: 'metric',
      lang: 'en',
    },
  })
  return response.data
}

export async function getWeatherByCoords(lat, lon) {
  ensureEnv(OPENWEATHER_KEY, 'VITE_OPENWEATHER_KEY')
  const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      lat,
      lon,
      appid: OPENWEATHER_KEY,
      units: 'metric',
      lang: 'en',
    },
  })
  return response.data
}

export async function getForecastByCoords(lat, lon) {
  ensureEnv(OPENWEATHER_KEY, 'VITE_OPENWEATHER_KEY')
  const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
    params: {
      lat,
      lon,
      appid: OPENWEATHER_KEY,
      units: 'metric',
      lang: 'en',
    },
  })

  const timezoneOffset = response.data.city.timezone
  const daily = {}

  // Calculamos la fecha de hoy para la zona horaria local de la ciudad
  const todayStr = new Date((Date.now() / 1000 + timezoneOffset) * 1000).toISOString().slice(0, 10)

  response.data.list.forEach((item) => {
    const localDate = new Date((item.dt + timezoneOffset) * 1000).toISOString().slice(0, 10)
    
    // Ignoramos los datos de "Hoy" para empezar siempre con "Tomorrow"
    if (localDate === todayStr) return

    if (!daily[localDate]) {
      daily[localDate] = {
        dt: item.dt,
        timezone: timezoneOffset,
        tempMin: item.main.temp_min,
        tempMax: item.main.temp_max,
        icon: item.weather[0].icon,
        description: item.weather[0].description,
      }
    } else {
      daily[localDate].tempMin = Math.min(daily[localDate].tempMin, item.main.temp_min)
      daily[localDate].tempMax = Math.max(daily[localDate].tempMax, item.main.temp_max)
    }
  })

  // Retornamos exactamente los primeros 5 días procesados
  return Object.values(daily).slice(0, 5)
}