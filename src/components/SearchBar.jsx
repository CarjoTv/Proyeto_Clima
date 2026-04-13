export default function SearchBar({ query, setQuery, onSearch, options, onSelect }) {
  return (
    <div className="flex-1 mr-4 relative">
      <form onSubmit={onSearch} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for places"
          className="w-full bg-[#6E707A] text-[#E7E7EB] placeholder-[#E7E7EB] font-medium px-4 py-2.5 shadow-md focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
        />
        <button 
          type="submit"
          className="bg-[#3C47E9] text-white px-4 py-2 hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>

      {/* Lista de opciones encontradas */}
      {options && options.length > 0 && (
        <ul className="absolute z-50 w-full mt-2 bg-[#1E213A] border border-[#6E707A] shadow-2xl">
          {options.map((opt, i) => (
            <li 
              key={`${opt.lat}-${opt.lon}-${i}`}
              onClick={() => onSelect(opt.lat, opt.lon, opt.name)}
              className="px-4 py-3 hover:border border-[#6E707A] cursor-pointer text-[#E7E7EB] flex justify-between group"
            >
              <span>{opt.name}, {opt.country}</span>
              <span className="text-[#6E707A] group-hover:text-[#E7E7EB]">›</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}