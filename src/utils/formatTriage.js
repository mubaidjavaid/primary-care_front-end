export function formatUrgency(value) {
  return (value || "Routine").toString().trim();
}

export function splitActions(actionText = "") {
  return actionText
    .split(/\n|\d+\./)
    .map((line) => line.trim())
    .filter(Boolean);
}
