const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const TOKEN_KEY = "yogyahar_admin_token";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

async function request(path, options = {}) {
  const token = getToken();
  const headers = { "Content-Type": "application/json", ...options.headers };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });

  if (res.status === 401) {
    clearToken();
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed with status ${res.status}`);
  }

  if (res.status === 204) return null;
  return res.json();
}

async function upload(path, file) {
  const token = getToken();
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;

  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers,
    body: formData,
  });

  if (res.status === 401) clearToken();

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Upload failed with status ${res.status}`);
  }

  return res.json();
}

export const api = {
  get: (path) => request(path),
  post: (path, data) => request(path, { method: "POST", body: JSON.stringify(data) }),
  put: (path, data) => request(path, { method: "PUT", body: JSON.stringify(data) }),
  upload: (path, file) => upload(path, file),
};

export const API_BASE_URL = BASE_URL;

export function resolveImage(image, fallback = null) {
  if (!image) {
    return fallback || null;
  }

  // Handle Vite asset object imports (which may resolve as { default: "..." } or similar, or just a URL string)
  let pathStr = "";
  if (typeof image === "object" && image !== null) {
    pathStr = image.default || "";
  } else if (typeof image === "string") {
    pathStr = image;
  }

  if (!pathStr || pathStr.trim() === "") {
    return fallback || null;
  }

  const trimmed = pathStr.trim();
  let cleanPath = trimmed;
  if (cleanPath.startsWith("/src/assets/")) {
    cleanPath = cleanPath.replace("/src/assets/", "/images/");
  }

  // 1. Full absolute URLs or data/blob URIs
  if (
    cleanPath.startsWith("http://") ||
    cleanPath.startsWith("https://") ||
    cleanPath.startsWith("data:") ||
    cleanPath.startsWith("blob:") ||
    cleanPath.startsWith("/@") ||
    cleanPath.startsWith("/src/") ||
    cleanPath.startsWith("@fs/")
  ) {
    return cleanPath;
  }

  // 2. Vite / Frontend static assets
  if (
    cleanPath.startsWith("/assets/") ||
    cleanPath.startsWith("assets/") ||
    cleanPath.startsWith("/images/") ||
    cleanPath.startsWith("images/") ||
    cleanPath.startsWith("/public/") ||
    cleanPath.startsWith("public/")
  ) {
    return cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`;
  }

  const cleanBase = BASE_URL.replace(/\/$/, "");

  // 3. Backend uploaded images
  if (cleanPath.startsWith("/uploads/") || cleanPath.startsWith("uploads/")) {
    const cleanPathPart = cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`;
    return `${cleanBase}${cleanPathPart}`;
  }

  // 4. Any other path starting with /
  if (cleanPath.startsWith("/")) {
    return `${cleanBase}${cleanPath}`;
  }

  // 5. Fallback
  return `${cleanBase}/${cleanPath}`;
}

