export default function SearchBar({ query, setQuery, onSearch }) {
  return (
    <form onSubmit={onSearch} className="flex-1 mr-4">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for places"
          className="w-full bg-[#6E707A] text-[#E7E7EB] placeholder-[#E7E7EB] font-medium px-4 py-2.5 shadow-md focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
        />
      </div>
    </form>
  )
}