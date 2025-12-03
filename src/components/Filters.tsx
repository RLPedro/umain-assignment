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
        <div className="space-y-[32px]">
            <div>
                <h2
                    className="text-[24px]"
                    style={{
                        lineHeight: '100%',
                    }}
                >
                    Filter
                </h2>
            </div>

            <div>
                <h3 className="text-[12px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Food Category</h3>
                <div className="flex flex-wrap gap-2">
                    {filters.map((filter) => {
                        const isActive = activeFilterIds.includes(filter.id);
                        return (
                            <button
                                key={filter.id}
                                onClick={() => onToggleFilter(filter.id)}
                                className={clsx(
                                    'px-4 py-2 rounded-[8px] transition-colors duration-200 border w-fit',
                                    isActive
                                        ? 'bg-black text-white border-black'
                                        : 'bg-white border-gray-100 hover:border-gray-200'
                                )}
                                style={{
                                    fontSize: '12px',
                                    lineHeight: '125%',
                                    color: isActive ? '#FFFFFF' : '#000000'
                                }}
                            >
                                {filter.name}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div>
                <h3 className="text-[12px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Delivery Time</h3>
                <div className="flex flex-wrap gap-2">
                    {DELIVERY_TIMES.map((time) => {
                        const isActive = activeDeliveryTimes.includes(time.value);
                        return (
                            <button
                                key={time.value}
                                onClick={() => onToggleDeliveryTime(time.value)}
                                className={clsx(
                                    'px-4 py-2 rounded-[8px] transition-colors duration-200 border whitespace-nowrap',
                                    isActive
                                        ? 'bg-black text-white border-black'
                                        : 'bg-white border-gray-100 hover:border-gray-200'
                                )}
                                style={{
                                    fontSize: '12px',
                                    lineHeight: '125%',
                                    letterSpacing: '-0.5px',
                                    fontWeight: 400,
                                    color: isActive ? '#FFFFFF' : '#000000'
                                }}
                            >
                                {time.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div>
                <h3 className="text-[12px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Price Range</h3>
                <div className="flex flex-wrap gap-[8px]">
                    {priceRanges.map((range) => {
                        const isActive = activePriceRangeIds.includes(range.id);
                        return (
                            <button
                                key={range.id}
                                onClick={() => onTogglePriceRange(range.id)}
                                className={clsx(
                                    'p-[8px] rounded-[8px] transition-colors duration-200 border w-fit h-fit',
                                    isActive
                                        ? 'bg-black text-white border-black'
                                        : 'bg-white border-gray-100 hover:border-gray-200'
                                )}
                                style={{
                                    fontSize: '12px',
                                    lineHeight: '125%',
                                    letterSpacing: '-0.5px',
                                    fontWeight: 400,
                                    color: isActive ? '#FFFFFF' : '#000000'
                                }}
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
