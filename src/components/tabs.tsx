import clsx from 'clsx';

type Tab = { index: number; label: string };
interface TabsProps {
  tabs: ReadonlyArray<Tab>;
  activeTab: number;
  onTabChange: (index: number) => void;
}

export function Tabs({ tabs, activeTab = 0, onTabChange }: TabsProps) {
  return (
    <nav
      className="relative z-0 rounded-t-lg text-white shadow flex divide-x divide-transparent border-t border-l border-r border-dark-100 text-3xl border-b-transparent"
      aria-label="Tabs"
    >
      {tabs.map((tab, tabIndex) => (
        <button
          onClick={() => onTabChange(tabIndex)}
          key={tabIndex}
          type="button"
          role="tab"
          aria-selected={tabIndex === activeTab}
          tabIndex={tabIndex}
          id={`tab-${tabIndex}`}
          aria-controls={`tab-panel-${tabIndex}`}
          className={clsx(
            'text-white text-xl font-serif tracking-wider',
            tabIndex === activeTab ? 'text-gray-500 bg-transparent' : 'text-gray-900 bg-dark-500',
            tabIndex === 0 && 'rounded-tl-lg',
            tabIndex === tabs.length - 1 && 'rounded-tr-lg',
            'group relative min-w-0 flex-1 overflow-hidden text-white py-4 px-4 text-sm font-medium text-center hover:bg-dark-800 focus:z-10'
          )}
        >
          <span>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
