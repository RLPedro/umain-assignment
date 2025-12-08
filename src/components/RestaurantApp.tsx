'use client';

import { useState, useMemo } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { Restaurant, Filter, PriceRange } from '@/lib/api';
import { DELIVERY_TIME_OPTIONS } from '@/lib/constants';
import { Sidebar } from './Sidebar';
import { RestaurantCard } from './RestaurantCard';
import { CategoryRail } from './CategoryRail';
import { MobileSplash } from './MobileSplash';

interface RestaurantAppProps {
    restaurants: Restaurant[];
    filters: Filter[];
    priceRanges: PriceRange[];
}

export function RestaurantApp({ restaurants, filters, priceRanges }: RestaurantAppProps) {
    const [activeFilterIds, setActiveFilterIds] = useState<string[]>([]);
    const [activePriceRangeIds, setActivePriceRangeIds] = useState<string[]>([]);
    const [activeDeliveryTimes, setActiveDeliveryTimes] = useState<string[]>([]);
    const [showSplash, setShowSplash] = useState(true);

    const toggleItem = (id: string, setState: React.Dispatch<React.SetStateAction<string[]>>) => {
        setState((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]);
    };

    const toggleFilter = (id: string) => toggleItem(id, setActiveFilterIds);
    const togglePriceRange = (id: string) => toggleItem(id, setActivePriceRangeIds);
    const toggleDeliveryTime = (time: string) => toggleItem(time, setActiveDeliveryTimes);

    const filteredRestaurants = useMemo(() => {
        return restaurants.filter((restaurant) => {
            if (activeFilterIds.length > 0) {
                const hasCategory = activeFilterIds.some((id) => restaurant.filter_ids.includes(id));
                if (!hasCategory) return false;
            }

            if (activePriceRangeIds.length > 0) {
                const hasPrice = activePriceRangeIds.includes(restaurant.price_range_id);
                if (!hasPrice) return false;
            }

            if (activeDeliveryTimes.length > 0) {
                const time = restaurant.delivery_time_minutes;
                const matchesAny = activeDeliveryTimes.some((range) => {
                    switch (range) {
                        case '0-10':
                            return time <= 10;
                        case '10-30':
                            return time > 10 && time <= 30;
                        case '30-60':
                            return time > 30 && time <= 60;
                        case '60+':
                            return time > 60;
                        default:
                            return false;
                    }
                });
                if (!matchesAny) return false;
            }

            return true;
        });
    }, [restaurants, activeFilterIds, activePriceRangeIds, activeDeliveryTimes]);

    return (
        <div className="flex min-h-screen bg-[var(--color-background)]">
            {showSplash && <MobileSplash onContinue={() => setShowSplash(false)} />}

            <Sidebar
                filters={filters}
                priceRanges={priceRanges}
                activeFilterIds={activeFilterIds}
                activePriceRangeIds={activePriceRangeIds}
                activeDeliveryTimes={activeDeliveryTimes}
                onToggleFilter={toggleFilter}
                onTogglePriceRange={togglePriceRange}
                onToggleDeliveryTime={toggleDeliveryTime}
            />

            <div className="flex-1 flex flex-col h-full overflow-hidden relative w-full">
                <div className="md:hidden flex-none px-6 pt-[94px] pb-5 bg-[var(--color-background)] z-20 max-w-[375px] mx-auto w-full">
                    <div className="w-[167.17px] h-6 relative mb-6">
                        <Image
                            src="/munchies-logo.svg"
                            alt="munchies."
                            fill
                            className="object-contain object-left"
                            preload
                        />
                    </div>

                    <div className="flex flex-col gap-3">
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Delivery Time</h3>
                        <div className="flex flex-wrap gap-2 w-[330px]">
                            {DELIVERY_TIME_OPTIONS.map((time) => {
                                const isActive = activeDeliveryTimes.includes(time.value);
                                return (
                                    <button
                                        key={time.value}
                                        onClick={() => toggleDeliveryTime(time.value)}
                                        className={clsx(
                                            'px-3 py-2 rounded-[8px] transition-all duration-200 border whitespace-nowrap text-xs leading-[1.25]',
                                            isActive
                                                ? 'bg-[var(--color-foreground)] text-[var(--color-background)] border-[var(--color-foreground)]'
                                                : 'bg-[var(--color-card)] border-gray-100 hover:border-gray-200 text-[var(--color-foreground)] shadow-sm'
                                        )}
                                    >
                                        {time.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <main className="flex-1 w-full md:pt-[144px] md:pr-[40px]">
                    <div className="w-full max-w-[375px] md:max-w-[1015px] mx-auto px-6 md:px-0 flex flex-col">
                        <div className="w-full mb-6 md:mb-[32px] md:h-[104px]">
                            <CategoryRail
                                filters={filters}
                                activeFilterIds={activeFilterIds}
                                onToggleFilter={toggleFilter}
                            />
                        </div>

                        <h2 className="text-xl md:text-[40px] leading-none font-normal text-[var(--color-foreground)] mb-[17px] md:mb-[32px]">
                            Restaurant's
                        </h2>

                        <div className="flex flex-col md:grid md:grid-cols-[repeat(auto-fit,minmax(327px,1fr))] gap-[17px] pb-16">
                            {filteredRestaurants.map((restaurant) => (
                                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                            ))}
                            {filteredRestaurants.length === 0 && (
                                <div className="text-center py-12 text-[var(--color-text-muted)] col-span-full">
                                    No restaurants found matching your filters.
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
