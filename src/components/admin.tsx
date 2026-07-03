import { useEffect, useMemo, useState } from "react";
import { getAnalytics, clearAnalytics, EventItem } from "../lib/analytics";

export default function Admin() {
  const [data, setData] = useState<EventItem[]>([]);

  useEffect(() => {
    setData(getAnalytics());
  }, []);

  const sessions = useMemo(() => {
    const map = new Map<string, EventItem[]>();

    data.forEach((e) => {
      if (!map.has(e.sessionId)) map.set(e.sessionId, []);
      map.get(e.sessionId)!.push(e);
    });

    return Array.from(map.values());
  }, [data]);

  const totalSessions = sessions.length;

  const quizSteps = data.filter((d) => d.event.includes("step_"));
  const answers = data.filter((d) => d.event.includes("answer"));

  const avgTime = useMemo(() => {
    if (sessions.length === 0) return 0;

    const times = sessions.map((s) => {
      const start = s.find((e) => e.event.includes("view"))?.time || s[0].time;
      const end = s[s.length - 1].time;
      return (end - start) / 1000;
    });

    return (times.reduce((a, b) => a + b, 0) / times.length).toFixed(1);
  }, [sessions]);

  const answerCount = useMemo(() => {
    const map: Record<string, number> = {};

    answers.forEach((a) => {
      const key = a.event;
      map[key] = (map[key] || 0) + 1;
    });

    return map;
  }, [answers]);

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">📊 Admin Analytics</h1>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl shadow">
          <p>Total sessões</p>
          <h2 className="text-2xl font-bold">{totalSessions}</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p>Tempo médio no quiz</p>
          <h2 className="text-2xl font-bold">{avgTime}s</h2>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-bold mb-2">📌 Respostas mais comuns</h2>

        <div className="space-y-1 text-sm">
          {Object.entries(answerCount).map(([key, value]) => (
            <div key={key} className="flex justify-between border-b py-1">
              <span>{key}</span>
              <b>{value}</b>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-bold mb-2">📉 Eventos do funil</h2>

        <pre className="text-xs overflow-auto max-h-64">
          {JSON.stringify(data.slice(-20), null, 2)}
        </pre>
      </div>

      <button
        onClick={() => {
          clearAnalytics();
          window.location.reload();
        }}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Limpar dados
      </button>
    </div>
  );
}