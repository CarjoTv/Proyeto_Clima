function formatForecastDay(timestamp, timezone, index) {
  if (index === 0) return 'Tomorrow'
  return new Date((timestamp + timezone) * 1000).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })
}

export default function ForecastPanel({ forecasts, unit }) {
  const renderValue = (temp) => {
    if (unit === 'F') return Math.round((temp * 9) / 5 + 32)
    return Math.round(temp)
  }

  if (!forecasts || forecasts.length === 0) return null

  // Mostrar solo 5 días
  const fiveDays = forecasts.slice(0, 5)

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 lg:gap-6">
      {fiveDays.map((forecast, index) => {
        const iconUrl = new URL(`../assets/weather/${forecast.icon}.png`, import.meta.url).href
        const unitSymbol = unit === 'C' ? '°C' : '°F'

        return (
          <article
            key={forecast.dt}
            className="bg-[#1E213A] p-4 flex flex-col items-center justify-between min-h-[160px]"
          >
            <p className="text-[16px] text-[#E7E7EB] font-medium mb-2">
              {formatForecastDay(forecast.dt, forecast.timezone, index)}
            </p>
            <img src={iconUrl} alt={forecast.description} className="h-14 w-14 my-2 object-contain" />
            <div className="mt-auto w-full flex justify-between px-2 text-[16px] font-medium">
              <span className="text-[#E7E7EB]">{renderValue(forecast.tempMax)}{unitSymbol}</span>
              <span className="text-[#A09FB1]">{renderValue(forecast.tempMin)}{unitSymbol}</span>
            </div>
          </article>
        )
      })}
    </div>
  )
}