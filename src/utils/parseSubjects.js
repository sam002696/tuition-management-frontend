// utils/parseSubjects.js

export function parseSubjectList(subjectsRaw) {
  if (typeof subjectsRaw !== "string") return [];

  try {
    const parsed = JSON.parse(subjectsRaw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch (err) {
    console.log(err);
    // JSON.parse failed, fallback to CSV
  }

  return subjectsRaw.split(",").map((s) => s.trim());
}
