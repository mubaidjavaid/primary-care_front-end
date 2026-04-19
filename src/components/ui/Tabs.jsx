import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

export default function Tabs({ tabs, panels }) {
  return (
    <TabGroup>
      <TabList className="mb-4 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <Tab
            key={tab}
            className="rounded-button border border-medical-border px-3 py-2 text-sm font-semibold data-[selected]:bg-navy-700 data-[selected]:text-white"
          >
            {tab}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        {panels.map((panel, index) => (
          <TabPanel key={index}>{panel}</TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
}
