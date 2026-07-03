import { useEffect, useMemo, useState } from "react";
import { getAnalytics, clearAnalytics, EventItem } from "../lib/analytics";

export default function AdminDashboard() {
  const [data, setData] = useState<EventItem[]>([]);

  useEffect(() => {
    setData(getAnalytics());
  }, []);

  // =========================
  // SESSÕES
  // =========================
  const sessions = useMemo(() => {
    const map = new Map<string, EventItem[]>();

    data.forEach((e) => {
      if (!map.has(e.sessionId)) map.set(e.sessionId, []);
      map.get(e.sessionId)!.push(e);
    });

    const arr = Array.from(map.values());

    // ordenar por tempo
    arr.forEach((s) => s.sort((a, b) => a.timestamp - b.timestamp));

    return arr;
  }, [data]);

  const totalSessions = sessions.length;

  // =========================
  // TEMPO MÉDIO
  // =========================
  const avgTime = useMemo(() => {
    if (!sessions.length) return 0;

    const times = sessions.map((s) => {
      const start = s[0]?.timestamp;
      const end = s[s.length - 1]?.timestamp;

      if (!start || !end) return 0;

      return (end - start) / 1000;
    });

    const valid = times.filter((t) => t > 0);

    if (!valid.length) return 0;

    return (valid.reduce((a, b) => a + b, 0) / valid.length).toFixed(1);
  }, [sessions]);

  // =========================
  // FUNIL
  // =========================
  const funnel = useMemo(() => {
    return {
      views: data.filter((d) => d.event === "quiz_step_view").length,
      answers: data.filter((d) => d.event === "quiz_answer").length,
      result: data.filter((d) => d.event === "result_view").length,
      offer: data.filter((d) => d.event === "offer_view").length,
    };
  }, [data]);

  // =========================
  // DROP OFF POR STEP
  // =========================
  const dropoff = useMemo(() => {
    const map: Record<number, number> = {};

    data.forEach((e) => {
      if (typeof e.step === "number") {
        map[e.step] = (map[e.step] || 0) + 1;
      }
    });

    return map;
  }, [data]);

  // =========================
  // RESPOSTAS
  // =========================
  const answers = useMemo(() => {
    const map: Record<string, number> = {};

    data.forEach((e) => {
      if (e.event === "quiz_answer") {
        const val = e.value || "unknown";
        map[val] = (map[val] || 0) + 1;
      }
    });

    return map;
  }, [data]);

  const conversion = totalSessions
    ? ((funnel.offer / totalSessions) * 100).toFixed(1)
    : "0";

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">

      <h1 className="text-2xl font-bold">📊 Dashboard do Quiz</h1>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card label="Sessões" value={totalSessions} />
        <Card label="Tempo médio" value={`${avgTime}s`} />
        <Card label="Views" value={funnel.views} />
        <Card label="Conversão" value={`${conversion}%`} />
      </div>

      {/* FUNIL */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-bold mb-3">📉 Funil</h2>

        <Row label="Views" value={funnel.views} />
        <Row label="Answers" value={funnel.answers} />
        <Row label="Result" value={funnel.result} />
        <Row label="Offer" value={funnel.offer} />
      </div>

      {/* DROP OFF */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-bold mb-3">📌 Abandono por etapa</h2>

        {Object.entries(dropoff).map(([step, count]) => (
          <Row key={step} label={`Step ${step}`} value={count} />
        ))}
      </div>

      {/* RESPOSTAS */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-bold mb-3">🧠 Respostas mais comuns</h2>

        {Object.entries(answers).map(([val, count]) => (
          <Row key={val} label={val} value={count} />
        ))}
      </div>

      {/* RAW */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-bold mb-2">🧾 Últimos eventos</h2>
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

// =========================

function Card({ label, value }: any) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <p className="text-sm text-gray-500">{label}</p>
      <h2 className="text-xl font-bold">{value}</h2>
    </div>
  );
}

function Row({ label, value }: any) {
  return (
    <div className="flex justify-between border-b py-1 text-sm">
      <span>{label}</span>
      <b>{value}</b>
    </div>
  );
}