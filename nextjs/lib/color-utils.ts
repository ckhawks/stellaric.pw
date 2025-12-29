/**
 * Generate a consistent HSL color based on a string (e.g., pseudonym)
 * Same input always produces same color
 */
export function getColorFromString(str: string): string {
  // Simple hash function to convert string to number
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }

  // Use hash to generate HSL values
  // Hue: full spectrum (0-360)
  const hue = Math.abs(hash % 360);

  // Saturation: 60-90 to avoid washed out colors
  const saturation = 60 + (Math.abs(hash >> 8) % 30);

  // Lightness: 45-55 to avoid white (>80) and black (<20)
  const lightness = 45 + (Math.abs(hash >> 16) % 10);

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
