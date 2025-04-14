export const hasUniqueCharacters = (str: string) => {
  const cleaned = str.replace(/\s/g, "").toUpperCase();
  return new Set(cleaned).size === cleaned.length;
};
