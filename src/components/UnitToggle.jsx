export default function UnitToggle({ unit, setUnit }) {
  return (
    <div className="inline-flex rounded-3xl bg-slate-900/90 p-2 shadow-inner shadow-slate-950/40 ring-1 ring-white/5">
      {['C', 'F'].map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => setUnit(option)}
          className={`rounded-3xl px-4 py-2 text-sm font-semibold transition ${
            unit === option
              ? 'bg-cyan-500 text-slate-950'
              : 'bg-transparent text-slate-300 hover:bg-slate-800'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  )
}
