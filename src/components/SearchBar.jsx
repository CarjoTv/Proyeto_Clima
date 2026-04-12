import searchIcon from '../assets/search.svg'

export default function SearchBar({ query, setQuery, onSearch }) {
  return (
    <form onSubmit={onSearch} className="space-y-3 sm:flex sm:items-center sm:gap-3">
      <label htmlFor="city" className="sr-only">
        Buscar ciudad
      </label>
      <div className="relative flex-1">
        <img src={searchIcon} alt="Buscar" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 opacity-70" />
        <input
          id="city"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar lugar"
          className="w-full rounded-3xl border border-slate-700/80 bg-slate-900/90 py-3 pl-12 pr-4 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
        />
      </div>
      <button
        type="submit"
        className="inline-flex h-12 items-center justify-center rounded-3xl bg-cyan-500 px-6 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
      >
        Buscar
      </button>
    </form>
  )
}
