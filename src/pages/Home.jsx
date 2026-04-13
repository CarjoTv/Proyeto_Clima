import { useEffect, useState } from 'react'
import { useWeather } from '../hooks/useWeather.jsx'
import SearchBar from '../components/SearchBar.jsx'
import WeatherOverview from '../components/WeatherOverview.jsx'
import WeatherDetails from '../components/WeatherDetails.jsx'
import ForecastPanel from '../components/ForecastPanel.jsx'
import StatusMessage from '../components/StatusMessage.jsx'
import UnitToggle from '../components/UnitToggle.jsx'
import locationOnIcon from '../assets/location_on.svg'

export default function Home() {
  const {
    query, setQuery, weather, forecast, loading, error,
    locationCity, unit, setUnit, handleSearch, handleCurrentLocation
  } = useWeather()

  const currentDate = weather 
    ? new Date((weather.dt + weather.timezone) * 1000).toLocaleDateString('en-GB', {
        weekday: 'short', day: 'numeric', month: 'short'
      }) 
    : ''

  return (
    <div className="min-h-screen bg-[#100E1D] text-[#E7E7EB] flex flex-col lg:flex-row">
      
      {/* Sidebar Izquierdo: Aquí vive el fondo de nubes */}
      <aside className="w-full lg:w-[460px] bg-[#1E213A] p-6 lg:p-10 flex flex-col overflow-hidden relative">
        <div className="flex justify-between items-center mb-10">
          <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
          <button 
            onClick={handleCurrentLocation} 
            className="w-10 h-10 rounded-full bg-[#6E707A] flex items-center justify-center hover:bg-gray-500 transition shadow-lg"
          >
            <img src={locationOnIcon} alt="Ubicación" className="w-5 h-5" />
          </button>
        </div>

        {loading ? (
          <StatusMessage type="loading" />
        ) : error ? (
          <StatusMessage type="error" message={error} />
        ) : (
          weather && (
            <WeatherOverview 
              weather={weather} 
              unit={unit} 
              currentDate={currentDate} 
              locationCity={locationCity} 
            />
          )
        )}
      </aside>

      {/* Contenido Principal Derecho */}
      <main className="flex-1 px-6 py-12 lg:px-32 flex flex-col max-w-[1000px] mx-auto">
        <div className="flex justify-end mb-8">
          <UnitToggle unit={unit} setUnit={setUnit} />
        </div>

        {!loading && weather && (
          <>
            <ForecastPanel forecasts={forecast} unit={unit} />
            <WeatherDetails weather={weather} />
            <p className="text-center text-[#A09FB1] text-sm mt-auto pt-12">
              Created by <span className="font-bold">Anthony Olguin</span> - devChallenges.io
            </p>
          </>
        )}
      </main>
    </div>
  )
}