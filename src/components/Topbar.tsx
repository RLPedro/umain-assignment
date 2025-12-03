import { Filter, PriceRange } from '@/lib/api';
import { Filters } from './Filters';
import { useState } from 'react';
import Image from 'next/image';

interface TopbarProps {
    filters: Filter[];
    priceRanges: PriceRange[];
    activeFilterIds: string[];
    activePriceRangeIds: string[];
    activeDeliveryTimes: string[];
    onToggleFilter: (id: string) => void;
    onTogglePriceRange: (id: string) => void;
    onToggleDeliveryTime: (time: string) => void;
}

export function Topbar({
    filters,
    priceRanges,
    activeFilterIds,
    activePriceRangeIds,
    activeDeliveryTimes,
    onToggleFilter,
    onTogglePriceRange,
    onToggleDeliveryTime
}: TopbarProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="md:hidden fixed top-0 left-0 right-0 bg-background z-50 px-4 h-16 flex items-center justify-between">
            <div className="relative w-[140px] h-[32px]">
                <Image
                    src="/munchies-logo.svg"
                    alt="munchies."
                    fill
                    className="object-contain object-left"
                />
            </div>

            {isOpen && (
                <div className="absolute top-16 left-0 right-0 bg-background border-b border-gray-200 p-4 shadow-lg max-h-[80vh] overflow-y-auto">
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
            )}
        </header>
    );
}
