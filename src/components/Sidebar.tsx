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
        <aside className="hidden md:block">
            <div className="fixed top-[56px] left-[40px] w-[273.42px] h-[40px] flex items-center z-10">
                <Image
                    src="/munchies-logo.svg"
                    alt="Munchies"
                    width={273.42}
                    height={40}
                    priority
                />
            </div>

            <div
                className="fixed top-[144px] left-[40px] w-[239px] h-[764px] bg-white rounded-[8px] overflow-y-auto z-10 p-[24px]"
                style={{
                    borderWidth: '0.6px',
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                    boxShadow: '-4px 2px 10px rgba(0, 0, 0, 0.01), -16px 9px 18px rgba(0, 0, 0, 0.01), -35px 20px 24px rgba(0, 0, 0, 0), -63px 36px 29px rgba(0, 0, 0, 0), -98px 56px 32px rgba(0, 0, 0, 0)'
                }}
            >
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
