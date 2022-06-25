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
      className="relative z-0 rounded-t-lg text-white shadow flex divide-x divide-gray-200 border-t border-l border-r border-gray-500 text-3xl"
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
            tabIndex === activeTab
              ? 'text-gray-900 bg-dark-50'
              : 'text-gray-500 bg-dark-400/bg-dark-100',
            tabIndex === 0 ? 'rounded-tl-lg' : '',
            tabIndex === tabs.length - 1 ? 'rounded-tr-lg' : '',
            'group relative min-w-0 flex-1 overflow-hidden text-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-800 focus:z-10'
          )}
        >
          <span>{tab.label}</span>
          <span
            aria-hidden="true"
            className={clsx(
              tabIndex === activeTab ? 'bg-gray-500' : 'bg-transparent',
              'absolute inset-x-0 bottom-0 h-0.5'
            )}
          />
        </button>
      ))}
    </nav>
  );
}