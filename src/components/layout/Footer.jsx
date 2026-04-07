export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 py-4 px-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500 dark:text-gray-400">
        <p>TriageCare — Primary Care Triage Assistant for Pakistan</p>
        <p>Decision support only. Not a diagnostic tool.</p>
      </div>
    </footer>
  );
}
