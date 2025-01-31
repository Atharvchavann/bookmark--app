export function isValidUrl(string: string) {
  try {
    new URL(string)
    return true
  } catch (_) {
    return false
  }
}

export function isValidColor(string: string) {
  // Basic regex for hex, rgb, rgba, hsl, and hsla colors
  const colorRegex = /^(#[0-9A-F]{3,8}|(rgb|hsl)a?$$(-?\d+%?[,\s]+){2,3}\s*[\d.]+%?$$)$/i
  return colorRegex.test(string.trim())
}

