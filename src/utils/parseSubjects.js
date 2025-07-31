// utils/parseSubjects.js

export function parseSubjectList(subjectsRaw) {
  if (Array.isArray(subjectsRaw)) {
    if (subjectsRaw.length === 0) return [];
    return subjectsRaw.filter(subject => subject && typeof subject === 'object');
  }

  if (typeof subjectsRaw !== "string") return [];

  try {
    const parsed = JSON.parse(subjectsRaw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch (err) {
    console.error(err);
    // JSON.parse failed, fallback to CSV
  }

  return subjectsRaw.split(",").map((s) => s.trim());
}
