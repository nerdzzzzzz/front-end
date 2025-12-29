import { api } from "./api";

interface SessionData {
  userId?: string;
  mode: "FOCUS" | "SHORT_BREAK";
  duration: number; // in seconds
}

export const timerService = {
  /**
   * Sends the completed session data to the backend to calculate XP/Ranking.
   */
  completeSession: async (data: SessionData) => {
    try {
      const response = await api.post("/sessions/complete", {
        ...data,
        completedAt: new Date().toISOString(),
      });
      console.log("Session saved successfully:", response);
      return response;
    } catch (error) {
      console.error("Failed to save session:", error);
      // Here you could implement logic to save locally and retry later (offline support)
      throw error;
    }
  },

  /**
   * Optional: Notify backend that a session started (for anti-cheat or live status).
   */
  startSession: async (data: SessionData) => {
    try {
      await api.post("/sessions/start", {
        ...data,
        startedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Failed to start session log:", error);
    }
  },
};
