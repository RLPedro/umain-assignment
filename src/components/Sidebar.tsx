import { Filter, PriceRange } from '@/lib/api';
import { Filters } from './Filters';
import Image from 'next/image';

interface SidebarProps {
    filters: Filter[];
    priceRanges: PriceRange[];
    activeFilterIds: string[];
    activePriceRangeIds: string[];
    activeDeliveryTimes: string[];
    onToggleFilter: (id: string) => void;
    onTogglePriceRange: (id: string) => void;
    onToggleDeliveryTime: (time: string) => void;
}

export function Sidebar({
    filters,
    priceRanges,
    activeFilterIds,
    activePriceRangeIds,
    activeDeliveryTimes,
    onToggleFilter,
    onTogglePriceRange,
    onToggleDeliveryTime,
}: SidebarProps) {
    return (
        <aside className="hidden md:flex flex-col w-[299px] pt-[56px] pl-[40px] gap-12 bg-[var(--color-background)] shrink-0">
            <div className="w-[273.42px] h-[40px] flex items-center z-10 shrink-0">
                <Image
                    src="/munchies-logo.svg"
                    alt="Munchies"
                    width={273.42}
                    height={40}
                    priority
                />
            </div>

            <div className="w-[239px] h-[764px] bg-white rounded-[8px] overflow-y-auto z-10 p-6 border-[0.6px] border-[var(--color-border)] shadow-sm">
                <Filters
                    filters={filters}
                    priceRanges={priceRanges}
                    activeFilterIds={activeFilterIds}
                    activePriceRangeIds={activePriceRangeIds}
                    activeDeliveryTimes={activeDeliveryTimes}
                    onToggleFilter={onToggleFilter}
                    onTogglePriceRange={onTogglePriceRange}
                    onToggleDeliveryTime={onToggleDeliveryTime}
                />
            </div>
        </aside>
    );
}
