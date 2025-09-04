import axios from "axios";

// Create a progress entry for a lesson
export async function createProgress(userId: string, lessonId: string) {
  return axios.post("/api/progress", {
    userId,
    lessonId,
    completed: false, // always false when starting
  });
}

// Get progress for a specific user and lesson
export async function getProgress(userId: string, lessonId: string) {
  return axios.get(`/api/progress`, {
    params: { userId, lessonId },
  });
}

// Update progress to mark lesson as completed
export async function updateProgress(progressId: string) {
  return axios.patch("/api/progress", {
    id: progressId,
    completed: true,
  });
}

// Get all progress for a user
export async function getUserProgress(userId: string) {
  return axios.get(`/api/progress/user`, {
    params: { userId },
  });
}
