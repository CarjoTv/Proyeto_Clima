export default function StatusMessage({ type, message }) {
  const baseStyle = 'rounded-3xl border p-10 text-center shadow-2xl shadow-slate-950/40'
  const variants = {
    loading: 'border-slate-700/70 bg-slate-900/80 text-slate-300',
    error: 'border-rose-500/40 bg-rose-500/10 text-rose-200',
  }

  return (
    <div className={`${baseStyle} ${variants[type] || variants.loading}`}>
      <p className="text-lg font-semibold">{type === 'loading' ? 'Cargando...' : '¡Ups!'}</p>
      <p className="mt-2">{message}</p>
    </div>
  )
}
