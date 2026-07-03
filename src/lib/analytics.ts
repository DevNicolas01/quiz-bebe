export type EventName =
  | "quiz_start"
  | "quiz_step_view"
  | "quiz_answer"
  | "result_view"
  | "offer_view"
  | "checkout_click_basic"
  | "checkout_click_premium"
  | "video_play";

type EventItem = {
  event: EventName;
  step?: number;
  value?: string;
  time: number;
  sessionId: string;
};

const STORAGE_KEY = "analytics";

function getSessionId() {
  let id = localStorage.getItem("session_id");

  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("session_id", id);
  }

  return id;
}

export function track(
  event: EventName,
  data?: { step?: number; value?: string }
) {
  const raw = localStorage.getItem(STORAGE_KEY);
  const arr: EventItem[] = raw ? JSON.parse(raw) : [];

  arr.push({
    event,
    step: data?.step,
    value: data?.value,
    time: Date.now(),
    sessionId: getSessionId(),
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
}

export function getAnalytics(): EventItem[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function clearAnalytics() {
  localStorage.removeItem(STORAGE_KEY);
}