function formatTime(timestamp, timezone) {
  return new Date((timestamp + timezone) * 1000).toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

function formatValue(value, unit) {
  return unit === 'F' ? Math.round((value * 9) / 5 + 32) : Math.round(value)
}

export default function WeatherDetails({ weather, unit }) {
  if (!weather) {
    return null
  }

  const temperatureUnit = unit === 'C' ? '°C' : '°F'

  return (
    <section className="space-y-6 rounded-[2rem] bg-slate-950/90 p-8 shadow-2xl shadow-slate-950/40 ring-1 ring-white/5 backdrop-blur-xl">
      <div>
        <h3 className="text-2xl font-semibold text-cyan-200">Today&apos;s Highlights</h3>
        <p className="mt-2 text-sm text-slate-400">Los datos más relevantes del día.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-[1.75rem] bg-slate-900/95 p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Wind status</p>
          <p className="mt-4 text-4xl font-semibold text-white">{Math.round(weather.wind.speed * 3.6)} km/h</p>
          <p className="mt-2 text-sm text-slate-400">{weather.wind.deg}°</p>
        </div>
        <div className="rounded-[1.75rem] bg-slate-900/95 p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Humidity</p>
          <p className="mt-4 text-4xl font-semibold text-white">{weather.main.humidity}%</p>
          <div className="mt-4 h-2 rounded-full bg-slate-800">
            <div
              className="h-2 rounded-full bg-cyan-400"
              style={{ width: `${weather.main.humidity}%` }}
            />
          </div>
          <div className="mt-3 flex justify-between text-xs text-slate-500">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>
        <div className="rounded-[1.75rem] bg-slate-900/95 p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Visibility</p>
          <p className="mt-4 text-4xl font-semibold text-white">{(weather.visibility / 1000).toFixed(2)} km</p>
        </div>
        <div className="rounded-[1.75rem] bg-slate-900/95 p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Air Pressure</p>
          <p className="mt-4 text-4xl font-semibold text-white">{weather.main.pressure} mb</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-[1.75rem] bg-slate-900/95 p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Máxima</p>
          <p className="mt-4 text-3xl font-semibold text-white">{formatValue(weather.main.temp_max, unit)}{temperatureUnit}</p>
        </div>
        <div className="rounded-[1.75rem] bg-slate-900/95 p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Mínima</p>
          <p className="mt-4 text-3xl font-semibold text-white">{formatValue(weather.main.temp_min, unit)}{temperatureUnit}</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-[1.75rem] bg-slate-900/95 p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Amanecer</p>
          <p className="mt-4 text-lg font-semibold text-white">{formatTime(weather.sys.sunrise, weather.timezone)}</p>
        </div>
        <div className="rounded-[1.75rem] bg-slate-900/95 p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Atardecer</p>
          <p className="mt-4 text-lg font-semibold text-white">{formatTime(weather.sys.sunset, weather.timezone)}</p>
        </div>
      </div>
    </section>
  )
}
