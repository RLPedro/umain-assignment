import { Filter, PriceRange } from '@/lib/api';
import clsx from 'clsx';

interface FiltersProps {
    filters: Filter[];
    priceRanges: PriceRange[];
    activeFilterIds: string[];
    activePriceRangeIds: string[];
    activeDeliveryTimes: string[];
    onToggleFilter: (id: string) => void;
    onTogglePriceRange: (id: string) => void;
    onToggleDeliveryTime: (time: string) => void;
}

const DELIVERY_TIMES = [
    { label: '0-10 min', value: '0-10' },
    { label: '10-30 min', value: '10-30' },
    { label: '30-60 min', value: '30-60' },
    { label: '1 hour+', value: '60+' },
];

export function Filters({
    filters,
    priceRanges,
    activeFilterIds,
    activePriceRangeIds,
    activeDeliveryTimes,
    onToggleFilter,
    onTogglePriceRange,
    onToggleDeliveryTime,
}: FiltersProps) {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl leading-none">
                    Filter
                </h2>
            </div>

            <div>
                <h3 className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-3">Food Category</h3>
                <div className="flex flex-wrap gap-2">
                    {filters.map((filter) => {
                        const isActive = activeFilterIds.includes(filter.id);
                        return (
                            <button
                                key={filter.id}
                                onClick={() => onToggleFilter(filter.id)}
                                className={clsx(
                                    'px-4 py-2 rounded-[8px] transition-colors duration-200 border w-fit text-xs leading-[1.25]',
                                    isActive
                                        ? 'bg-[var(--color-foreground)] text-[var(--color-background)] border-[var(--color-foreground)]'
                                        : 'bg-[var(--color-card)] border-gray-100 hover:border-gray-200 text-[var(--color-foreground)]'
                                )}
                            >
                                {filter.name}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div>
                <h3 className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-3">Delivery Time</h3>
                <div className="flex flex-wrap gap-2">
                    {DELIVERY_TIMES.map((time) => {
                        const isActive = activeDeliveryTimes.includes(time.value);
                        return (
                            <button
                                key={time.value}
                                onClick={() => onToggleDeliveryTime(time.value)}
                                className={clsx(
                                    'px-4 py-2 rounded-[8px] transition-colors duration-200 border whitespace-nowrap text-xs leading-[1.25] tracking-[-0.5px] font-normal',
                                    isActive
                                        ? 'bg-[var(--color-foreground)] text-[var(--color-background)] border-[var(--color-foreground)]'
                                        : 'bg-[var(--color-card)] border-gray-100 hover:border-gray-200 text-[var(--color-foreground)]'
                                )}
                            >
                                {time.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div>
                <h3 className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-3">Price Range</h3>
                <div className="flex flex-wrap gap-2">
                    {priceRanges.map((range) => {
                        const isActive = activePriceRangeIds.includes(range.id);
                        return (
                            <button
                                key={range.id}
                                onClick={() => onTogglePriceRange(range.id)}
                                className={clsx(
                                    'p-2 rounded-[8px] transition-colors duration-200 border w-fit h-fit text-xs leading-[1.25] tracking-[-0.5px] font-normal',
                                    isActive
                                        ? 'bg-[var(--color-foreground)] text-[var(--color-background)] border-[var(--color-foreground)]'
                                        : 'bg-[var(--color-card)] border-gray-100 hover:border-gray-200 text-[var(--color-foreground)]'
                                )}
                            >
                                {range.range}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
