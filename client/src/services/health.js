import {API_URL} from "@/main.js";

export async function isBackendUp(){
  const controller = new AbortController();
  const timeoutMs = 2000;
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    console.log("Checking backend health...");
    const res = await fetch(`${API_URL}/health`, { method: 'GET', signal: controller.signal });
    clearTimeout(timeout);
    // console.log("Backend health check response:", res);
    return res.ok; // true si status 200-299
  } catch {
    clearTimeout(timeout);
    return false;
  }
}
