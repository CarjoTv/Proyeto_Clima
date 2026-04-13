import locationIcon from '../assets/location.svg'
import cloudBg from '../assets/others/Cloud-background.png' 

export default function WeatherOverview({ weather, unit, currentDate, locationCity }) {
  const displayTemp = unit === 'C'
    ? Math.round(weather.main.temp)
    : Math.round((weather.main.temp * 9) / 5 + 32)
  
  const displayUnit = unit === 'C' ? '°C' : '°F'
  
  // Generar URL del icono dinámicamente
  const iconUrl = new URL(`../assets/weather/${weather.weather[0].icon}.png`, import.meta.url).href

  return (
    <div className="flex flex-col items-center flex-1 w-full text-center relative mt-10">
      
      {/* Contenedor del Icono con Fondo de Nubes */}
      <div className="relative w-full flex justify-center items-center mb-16 h-[200px]">
        {/* Imagen de fondo: Ajustada con opacidad baja para no saturar */}
        <img 
          src={cloudBg} 
          alt="Clouds background" 
          className="absolute inset-0 w-full h-full object-contain opacity-10 scale-150 z-0" 
        />
        
        {/* Icono del clima principal */}
        <img 
          src={iconUrl} 
          alt={weather.weather[0].description} 
          className="w-[150px] h-[150px] object-contain z-10 relative" 
        />
      </div>

      {/* Temperatura */}
      <h1 className="text-[144px] font-medium text-[#E7E7EB] leading-none mb-10 flex items-baseline">
        {displayTemp}
        <span className="text-5xl text-[#A09FB1] font-normal">{displayUnit}</span>
      </h1>

      {/* Descripción del clima */}
      <h3 className="text-4xl text-[#A09FB1] font-semibold capitalize mb-12">
        {weather.weather[0].description}
      </h3>

      {/* Fecha actual */}
      <div className="flex items-center gap-4 text-[#88869D] text-lg font-medium mb-8">
        <span>Today</span>
        <span>•</span>
        <span>{currentDate}</span>
      </div>

      {/* Ubicación */}
      <div className="flex items-center justify-center gap-2 text-[#88869D] font-semibold">
        <img src={locationIcon} alt="Ubicación" className="w-4 h-4 opacity-70" />
        <span>{locationCity}</span>
      </div>
    </div>
  )
}