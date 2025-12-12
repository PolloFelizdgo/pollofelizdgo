// Helper to normalize/display operating hours consistently across server and client
// This avoids hydration mismatches when different sources format hours differently.
export function formatHours(hours?: string | null) {
  if (!hours) return undefined;

  // If the hours already contain a full Spanish phrase, return as-is.
  const normalized = String(hours).trim();
  if (/lunes|domingo|a domingo|a los|de/i.test(normalized)) return normalized;

  // If hours look like an abbreviated range (e.g. "Lun-Dom 12:00 - 18:30"),
  // or contain a dash between times, normalize to the project's standard.
  if (/\d{1,2}:\d{2}\s*-\s*\d{1,2}:\d{2}/.test(normalized) || /lun/i.test(normalized)) {
    return "Lunes a domingo de 12:00 pm a 6:30 pm";
  }

  // Fallback: return the original string so we don't lose data.
  return normalized;
}
