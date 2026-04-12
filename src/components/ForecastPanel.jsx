function formatForecastDay(timestamp, timezone) {
  return new Date((timestamp + timezone) * 1000).toLocaleDateString('es-ES', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })
}

export default function ForecastPanel({ forecasts, unit }) {
  const renderValue = (temp) => {
    if (unit === 'F') {
      return Math.round((temp * 9) / 5 + 32)
    }
    return Math.round(temp)
  }

  if (!forecasts || forecasts.length === 0) {
    return <p className="mt-6 text-sm text-slate-400">Pronóstico no disponible.</p>
  }

  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {forecasts.map((forecast) => {
        const iconUrl = new URL(`../assets/weather/${forecast.icon}.png`, import.meta.url).href

        return (
          <article
            key={forecast.dt}
            className="rounded-[1.75rem] bg-slate-950/95 p-4 text-center shadow-lg shadow-slate-950/20 ring-1 ring-white/5"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{formatForecastDay(forecast.dt, forecast.timezone)}</p>
            <img src={iconUrl} alt={forecast.description} className="mx-auto my-4 h-20 w-20" />
            <p className="text-sm text-slate-300 capitalize">{forecast.description}</p>
            <div className="mt-4 flex items-center justify-center gap-3 text-sm text-slate-100">
              <span className="font-semibold text-cyan-200">{renderValue(forecast.tempMax)}°</span>
              <span className="text-slate-500">{renderValue(forecast.tempMin)}°</span>
            </div>
          </article>
        )
      })}
    </div>
  )
}
