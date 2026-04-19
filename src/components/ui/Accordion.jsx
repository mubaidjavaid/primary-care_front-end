import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from "@headlessui/react";
import { ChevronDown } from "lucide-react";

export default function Accordion({ title, children, defaultOpen = false }) {
  return (
    <Disclosure defaultOpen={defaultOpen}>
      {({ open }) => (
        <div className="rounded-card border border-medical-border bg-white">
          <DisclosureButton className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold">
            <span>{title}</span>
            <ChevronDown
              className={`transition-transform ${open ? "rotate-180" : ""}`}
              size={16}
            />
          </DisclosureButton>
          <DisclosurePanel className="px-4 pb-4">{children}</DisclosurePanel>
        </div>
      )}
    </Disclosure>
  );
}
