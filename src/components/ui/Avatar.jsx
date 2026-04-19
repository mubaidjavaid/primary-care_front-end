export default function Avatar({ name = "User" }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <span className="grid h-8 w-8 place-items-center rounded-full bg-navy-700 text-xs font-bold text-white">
      {initials}
    </span>
  );
}
