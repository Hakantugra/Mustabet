import React, { useEffect, useState } from "react";

export default function App() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/matches");
        const data = await res.json();
        const parsed = data.response.map((m) => ({
          id: m.fixture.id,
          home: m.teams.home.name,
          away: m.teams.away.name,
          start: m.fixture.date,
          odds: { H: 2.1, D: 3.2, A: 2.9 }
        }));
        setMatches(parsed);
      } catch (e) {
        console.error("API error", e);
      }
    }
    load();
  }, []);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">⚽ MusBet</h1>
      {matches.length === 0 && (
        <p className="text-gray-500 text-center">Yükleniyor...</p>
      )}
      {matches.map((m) => (
        <div
          key={m.id}
          className="bg-white shadow rounded-xl p-4 mb-3 flex flex-col"
        >
          <div className="flex justify-between font-semibold mb-2">
            <span>{m.home}</span>
            <span>vs</span>
            <span>{m.away}</span>
          </div>
          <div className="text-sm text-gray-500 mb-2">
            Başlangıç: {new Date(m.start).toLocaleString()}
          </div>
          <div className="flex justify-around">
            <button className="bg-green-500 text-white px-3 py-1 rounded-lg">
              {m.odds.H}
            </button>
            <button className="bg-yellow-500 text-white px-3 py-1 rounded-lg">
              {m.odds.D}
            </button>
            <button className="bg-red-500 text-white px-3 py-1 rounded-lg">
              {m.odds.A}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}