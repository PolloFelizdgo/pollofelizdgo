/**
 * Utility functions for the Pollo Feliz application
 */

/**
 * Converts a string to a URL-friendly slug
 * @param text - The text to slugify
 * @returns The slugified string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Formats a phone number for display
 * @param phone - The phone number to format
 * @returns Formatted phone number
 */
export function formatPhone(phone: string): string {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, "");
  
  // Format based on length
  if (cleaned.length === 10) {
    // Format as: (618) 129-3730
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  
  return phone; // Return original if doesn't match expected format
}

/**
 * Debounce function to limit the rate at which a function can fire
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Safely parse JSON with fallback
 * @param json - JSON string to parse
 * @param fallback - Fallback value if parsing fails
 * @returns Parsed object or fallback
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}

/**
 * Check if code is running on the client side
 * @returns True if running in browser
 */
export function isClient(): boolean {
  return typeof window !== "undefined";
}

/**
 * Get session storage item with type safety
 * @param key - Storage key
 * @param fallback - Fallback value
 * @returns Stored value or fallback
 */
export function getSessionStorage<T>(key: string, fallback: T): T {
  if (!isClient()) return fallback;
  
  try {
    const item = sessionStorage.getItem(key);
    return item ? safeJsonParse(item, fallback) : fallback;
  } catch {
    return fallback;
  }
}

/**
 * Set session storage item safely
 * @param key - Storage key
 * @param value - Value to store
 */
export function setSessionStorage<T>(key: string, value: T): void {
  if (!isClient()) return;
  
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Silently fail - storage might be full or unavailable
  }
}

/**
 * Clamp a number between min and max values
 * @param value - Value to clamp
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Clamped value
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
