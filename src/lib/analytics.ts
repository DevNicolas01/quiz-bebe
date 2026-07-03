export type EventName =
  | "quiz_start"
  | "quiz_step_view"
  | "quiz_answer"
  | "quiz_abandon"
  | "result_view"
  | "offer_view"
  | "video_play"
  | "plan_selected"
  | "checkout_click"
  | "purchase_complete";

export type EventItem = {
  event: EventName;
  step?: number;
  value?: string;
  questionId?: string;
  timestamp: number;
  sessionId: string;
};

const STORAGE_KEY = "analytics";

function getSessionId(): string {
  let id = localStorage.getItem("session_id");

  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("session_id", id);
  }

  return id;
}

export function track(
  event: EventName,
  data?: {
    step?: number;
    value?: string;
    questionId?: string;
  }
) {
  const item: EventItem = {
    event,
    step: data?.step,
    value: data?.value,
    questionId: data?.questionId,
    timestamp: Date.now(),
    sessionId: getSessionId(),
  };

  try {
    // salva local (fallback)
    const raw = localStorage.getItem(STORAGE_KEY);
    const arr: EventItem[] = raw ? JSON.parse(raw) : [];

    arr.push(item);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));

    fetch("/api/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    }).catch(() => {
      // não quebra o app se falhar
    });
  } catch (err) {
    console.error("Analytics error:", err);
  }
}

/**
 * PUXA DADOS (ADMIN PANEL)
 */
export function getAnalytics(): EventItem[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

/**
 * LIMPAR DADOS (TESTE / DEBUG)
 */
export function clearAnalytics() {
  localStorage.removeItem(STORAGE_KEY);
}