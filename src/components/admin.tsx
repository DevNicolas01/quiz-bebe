import { useEffect, useState } from "react";
import { getAnalytics, clearAnalytics } from "../lib/analytics";

type EventItem = {
  event: string;
  time: number;
};

export default function Admin() {
  const [data, setData] = useState<EventItem[]>([]);

  useEffect(() => {
    const events = getAnalytics();
    setData(events);
  }, []);

  const countEvent = (name: string) =>
    data.filter((e) => e.event === name).length;

  // pega eventos por padrão (step_1_view etc)
  const countLike = (prefix: string) =>
    data.filter((e) => e.event.startsWith(prefix)).length;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-2xl font-bold mb-6">
          📊 Painel de Analytics
        </h1>

        {/* RESUMO */}
        <div className="grid grid-cols-2 gap-4 mb-8">

          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-sm text-gray-500">Quiz iniciado</p>
            <p className="text-2xl font-bold">{countEvent("quiz_start")}</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-sm text-gray-500">Resultado</p>
            <p className="text-2xl font-bold">{countEvent("result_view")}</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-sm text-gray-500">Oferta vista</p>
            <p className="text-2xl font-bold">{countEvent("offer_view")}</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-sm text-gray-500">Checkout click</p>
            <p className="text-2xl font-bold">{countEvent("checkout_click_basic") + countEvent("checkout_click_premium")}</p>
          </div>
        </div>

        {/* FUNIL */}
        <div className="bg-white p-5 rounded-xl shadow mb-8">
          <h2 className="font-semibold mb-4">📈 Funil do Quiz</h2>

          <ul className="space-y-2 text-sm">
            <li>Step 1: {countLike("step_1_view")}</li>
            <li>Step 2: {countLike("step_2_view")}</li>
            <li>Step 3: {countLike("step_3_view")}</li>
            <li>Step 4: {countLike("step_4_view")}</li>
          </ul>
        </div>

        {/* LOG RAW */}
        <div className="bg-white p-5 rounded-xl shadow mb-8">
          <h2 className="font-semibold mb-4">🧾 Logs brutos</h2>

          <div className="max-h-80 overflow-auto text-xs space-y-1">
            {data.map((e, i) => (
              <div key={i} className="border-b py-1">
                {e.event} — {new Date(e.time).toLocaleString()}
              </div>
            ))}
          </div>
        </div>

        {/* RESET */}
        <button
          onClick={() => {
            clearAnalytics();
            setData([]);
          }}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Limpar dados
        </button>
      </div>
    </div>
  );
}