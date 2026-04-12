export default function WeatherOverview({ weather, unit, currentDate }) {
  const displayTemp = unit === 'C'
    ? Math.round(weather.main.temp)
    : Math.round((weather.main.temp * 9) / 5 + 32)
  const displayFeels = unit === 'C'
    ? Math.round(weather.main.feels_like)
    : Math.round((weather.main.feels_like * 9) / 5 + 32)
  const displayUnit = unit === 'C' ? '°C' : '°F'
  const iconUrl = new URL(`../assets/weather/${weather.weather[0].icon}.png`, import.meta.url).href

  return (
    <section className="rounded-[2rem] bg-slate-950/90 p-8 shadow-2xl shadow-slate-950/40 ring-1 ring-white/5 backdrop-blur-xl">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Hoy</p>
          <h2 className="mt-3 text-5xl font-semibold sm:text-6xl">{displayTemp}{displayUnit}</h2>
          <p className="mt-3 text-xl text-slate-300 capitalize">{weather.weather[0].description}</p>
          <p className="mt-4 text-sm uppercase tracking-[0.24em] text-slate-500">{currentDate}</p>
          <p className="mt-2 flex items-center gap-2 text-slate-400">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-900/90 text-cyan-200">📍</span>
            {weather.name}, {weather.sys.country}
          </p>
        </div>

        <div className="flex items-center justify-center rounded-[2rem] bg-slate-900/90 p-6 shadow-inner shadow-slate-950/50 sm:p-8">
          <img src={iconUrl} alt={weather.weather[0].description} className="h-36 w-36" />
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="rounded-[1.5rem] bg-slate-900/90 p-5">
          <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Sensación</p>
          <p className="mt-3 text-3xl font-semibold text-cyan-200">{displayFeels}{displayUnit}</p>
        </div>
        <div className="rounded-[1.5rem] bg-slate-900/90 p-5">
          <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Humedad</p>
          <p className="mt-3 text-3xl font-semibold text-cyan-200">{weather.main.humidity}%</p>
        </div>
      </div>
    </section>
  )
}
