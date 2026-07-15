export {};

declare global {
  interface Window {
    fbq?: (
      command: string,
      event: string,
      params?: Record<string, any>
    ) => void;
  }
}