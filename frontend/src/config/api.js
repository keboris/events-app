export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3001";

export const AUTH_ENDPOINT = `${API_BASE_URL}/api/auth`;
export const USERS_ENDPOINT = `${API_BASE_URL}/api/users`;
export const EVENTS_ENDPOINT = `${API_BASE_URL}/api/events`;
