/**
 * Formats a camel case string by adding spaces before capital letters
 * and ensuring only the first word is capitalized.
 *
 * @param str - The camel case string to format
 * @returns The formatted string with spaces and first word capitalized
 *
 * @example
 * formatCamelCase("thisIsATest") // Returns "This is a test"
 * formatCamelCase("camelCaseString") // Returns "Camel case string"
 */
export function formatCamelCase(str: string): string {
  const addSpaces = str.replace(/([A-Z])/g, " $1");
  return addSpaces.charAt(0).toUpperCase() + addSpaces.slice(1).toLowerCase();
}
