export default function UnitToggle({ unit, setUnit }) {
  return (
    <div className="flex gap-3">
      {['C', 'F'].map((option) => (
        <button
          key={option}
          onClick={() => setUnit(option)}
          className={`w-10 h-10 rounded-full font-bold text-lg flex items-center justify-center transition-colors ${
            unit === option
              ? 'bg-[#E1E1E6] text-[#110E3C]'
              : 'bg-[#585676] text-[#E7E7EB] hover:bg-[#6E707A]'
          }`}
        >
          °{option}
        </button>
      ))}
    </div>
  )
}