'use client'

import React from 'react'

// Define your leagues and their primary colors
const leagues = [
  { key: 'nfl', label: 'NFL', color: '#013369' },
  { key: 'nba', label: 'NBA', color: '#17408B' },
  { key: 'mlb', label: 'MLB', color: '#0C2340' },
  { key: 'nhl', label: 'NHL', color: '#111111' },
  { key: 'mls', label: 'MLS', color: '#0C8040' },
]

interface LeagueTabBannerProps {
  activeLeague: string
  onChange: (leagueKey: string) => void
}

export default function LeagueTabBanner({ activeLeague, onChange }: LeagueTabBannerProps) {
  return (
    <nav className="flex overflow-x-auto space-x-2 px-4 no-scrollbar">
      {leagues.map(({ key, label, color }) => {
        const isActive = key === activeLeague
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={
              `whitespace-nowrap px-4 py-2 rounded-full font-medium text-sm transition ` +
              (isActive
                ? 'text-white'
                : 'text-[#111827] hover:bg-gray-100')
            }
            style={isActive ? { backgroundColor: color } : undefined}
          >
            {label}
          </button>
        )
      })}
    </nav>
  )
}
