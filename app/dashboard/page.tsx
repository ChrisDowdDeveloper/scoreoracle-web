"use client";
import Highlights from '@/components/Highlights'
import LeagueStandings from '@/components/LeagueStandings'
import LeagueTabBanner from '@/components/LeagueTabBanner'
import Upcoming from '@/components/Upcoming'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const DashboardPage = () => {
  const router = useRouter()
  const params = useSearchParams();
  const league = params.get('league') || 'nfl'

  const handleLeagueChange = (newLeague: string) => {
    router.push(`/league?league=${newLeague}`)
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="px-4 lg:px-8 py-4 bg-white">
        <LeagueTabBanner activeLeague={league} onChange={handleLeagueChange} />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row flex-1 px-4 lg:px-8 py-6 gap-6">
        {/* Sidebar: Standings & Quick Links */}
        <aside className="hidden lg:block w-64 space-y-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-3">Standings</h3>
            <LeagueStandings league={league} />
          </div>
        </aside>

        {/* Main: Highlights & Upcoming */}
        <main className="flex-1 space-y-8">
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-4">Highlights</h2>
            <Highlights league={league} />
          </section>

          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-4">Upcoming Games</h2>
            <Upcoming league={league} />
          </section>
        </main>
      </div>
    </div>
  )
}

export default DashboardPage