export default function Drawer({ open, children, onClose }) {
  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close drawer"
          className="fixed inset-0 z-20 bg-black/30 xl:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed bottom-0 right-0 top-16 z-30 w-full max-w-full border-l border-medical-border bg-white p-4 transition-transform duration-300 ease-in-out xl:max-w-[360px] 2xl:max-w-[420px] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {children}
      </aside>
    </>
  );
}
