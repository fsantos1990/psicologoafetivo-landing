import React from 'react'

export function StatCard({ title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 p-6">
      <div className="text-xs uppercase tracking-widest text-white/60">{title}</div>
      <div className="mt-2 text-lg">{text}</div>
    </div>
  )
}

export function ServiceCard({ number, title, items }) {
  return (
    <div className="rounded-2xl border border-white/10 p-6">
      <div className="text-white/50 text-sm">{number}</div>
      <h3 className="mt-1 text-xl font-semibold">{title}</h3>
      <ul className="mt-4 space-y-2 text-white/80">
        {items.map((it, i) => (
          <li key={i} className="flex gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/60" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function ApproachCard({ title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 p-6">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-white/80">{text}</p>
    </div>
  )
}

export function Faq({ q, a }) {
  return (
    <details className="rounded-2xl border border-white/10 p-5 open:bg-white/5">
      <summary className="cursor-pointer list-none text-base font-medium">
        <span className="select-none">{q}</span>
      </summary>
      <p className="mt-3 text-white/80">{a}</p>
    </details>
  )
}
