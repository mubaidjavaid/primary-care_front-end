import { useMemo, useState } from "react";
import { commonSymptoms } from "../../utils/constants";

export default function SymptomsTagInput({ value = [], onChange }) {
  const [text, setText] = useState("");
  const suggestions = useMemo(
    () =>
      commonSymptoms
        .filter(
          (item) =>
            item.toLowerCase().includes(text.toLowerCase()) &&
            !value.includes(item),
        )
        .slice(0, 6),
    [text, value],
  );

  const addTag = (tag) => {
    if (!tag) return;
    if (!value.includes(tag)) onChange([...value, tag]);
    setText("");
  };

  return (
    <div className="space-y-2">
      <div className="input-field flex min-h-10 flex-wrap items-center gap-2 py-2">
        {value.map((tag) => (
          <span
            key={tag}
            className="rounded-badge bg-slate-100 px-2 py-1 text-xs"
          >
            {tag}{" "}
            <button
              type="button"
              onClick={() => onChange(value.filter((item) => item !== tag))}
            >
              ×
            </button>
          </span>
        ))}
        <input
          className="min-w-[160px] flex-1 border-0 bg-transparent p-0 text-sm focus:ring-0"
          value={text}
          onChange={(event) => setText(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === ",") {
              event.preventDefault();
              addTag(text.trim());
            }
          }}
          placeholder="Type symptom and press Enter"
        />
      </div>
      {text && suggestions.length > 0 && (
        <div className="rounded-input border border-medical-border bg-white p-2">
          {suggestions.map((item) => (
            <button
              type="button"
              key={item}
              className="mr-2 rounded-badge bg-slate-100 px-2 py-1 text-xs"
              onClick={() => addTag(item)}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
