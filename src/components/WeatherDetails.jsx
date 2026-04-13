export default function WeatherDetails({ weather }) {
  if (!weather) return null

  return (
    <section className="mt-12">
      <h3 className="text-2xl font-bold text-[#E7E7EB] mb-8">Today's Highlights</h3>
      <div className="grid gap-6 sm:grid-cols-2">
        {/* Wind Status */}
        <div className="bg-[#1E213A] p-6 flex flex-col items-center">
          <p className="text-[#E7E7EB] font-medium">Wind status</p>
          <p className="mt-2 text-6xl font-bold">{Math.round(weather.wind.speed)} <span className="text-4xl font-normal">mph</span></p>
          <div className="mt-6 flex items-center gap-2">
            {/* Flecha dinámica usando weather.wind.deg */}
            <div 
              className="w-7 h-7 rounded-full bg-[#ffffff33] flex items-center justify-center"
              style={{ transform: `rotate(${weather.wind.deg}deg)` }}
            >
               ➤
            </div>
            <span className="text-sm">WSW</span>
          </div>
        </div>
        
        {/* Humidity con Barra de Progreso */}
        <div className="bg-[#1E213A] p-6 flex flex-col items-center">
          <p className="text-[#E7E7EB] font-medium">Humidity</p>
          <p className="mt-2 text-6xl font-bold">{weather.main.humidity}%</p>
          <div className="w-full max-w-[220px] mt-6">
            <div className="flex justify-between text-[#A09FB1] text-xs font-bold mb-1">
              <span>0</span><span>50</span><span>100</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#E7E7EB]">
              <div className="h-full bg-[#FFEC65]" style={{ width: `${weather.main.humidity}%` }} />
            </div>
            <p className="text-right text-[#A09FB1] text-xs font-bold mt-1">%</p>
          </div>
        </div>

        {/* Visibility & Pressure */}
        <div className="bg-[#1E213A] p-6 flex flex-col items-center justify-center">
          <p className="text-[#E7E7EB] font-medium">Visibility</p>
          <p className="mt-2 text-6xl font-bold">{(weather.visibility / 1609.34).toFixed(1)} <span className="text-4xl font-normal">miles</span></p>
        </div>
        <div className="bg-[#1E213A] p-6 flex flex-col items-center justify-center">
          <p className="text-[#E7E7EB] font-medium">Air Pressure</p>
          <p className="mt-2 text-6xl font-bold">{weather.main.pressure} <span className="text-4xl font-normal">mb</span></p>
        </div>
      </div>
    </section>
  )
}