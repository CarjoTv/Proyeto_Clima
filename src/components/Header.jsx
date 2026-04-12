export default function Header({ locationCity }) {
  return (
    <header className="rounded-[2rem] bg-slate-950/95 px-6 py-5 shadow-2xl shadow-slate-950/40 ring-1 ring-white/5 backdrop-blur-xl">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Weather Dashboard</p>
        <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Clima elegante</h1>
        <p className="mt-2 max-w-2xl text-slate-400">
          Usa el buscador o tu ubicación para ver el estado actual y el pronóstico de los próximos días.
        </p>
        <p className="mt-4 text-sm text-slate-400">Ubicación detectada: {locationCity}</p>
      </div>
    </header>
  )
}
