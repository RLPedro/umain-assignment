'use client';

import { useState, useMemo } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { Restaurant, Filter, PriceRange } from '@/lib/api';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
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

    const toggleFilter = (id: string) => {
        setActiveFilterIds((prev) => {
            if (prev.includes(id)) {
                return prev.filter((f) => f !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    const togglePriceRange = (id: string) => {
        setActivePriceRangeIds((prev) => {
            if (prev.includes(id)) {
                return prev.filter((f) => f !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    const toggleDeliveryTime = (time: string) => {
        setActiveDeliveryTimes((prev) => {
            if (prev.includes(time)) {
                return prev.filter((t) => t !== time);
            } else {
                return [...prev, time];
            }
        });
    };

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
        <div className="h-screen md:min-h-screen flex flex-col md:flex-row bg-background overflow-hidden md:overflow-auto">
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
            <div className="hidden md:block">
                <Topbar
                    filters={filters}
                    priceRanges={priceRanges}
                    activeFilterIds={activeFilterIds}
                    activePriceRangeIds={activePriceRangeIds}
                    activeDeliveryTimes={activeDeliveryTimes}
                    onToggleFilter={toggleFilter}
                    onTogglePriceRange={togglePriceRange}
                    onToggleDeliveryTime={toggleDeliveryTime}
                />
            </div>

            <main className="flex-1 mt-0 md:mt-0 relative">
                <div
                    className="md:hidden flex flex-col mx-auto overflow-hidden"
                    style={{
                        maxWidth: '375px',
                        width: '100%',
                        height: '812px',
                        paddingLeft: '24px',
                        paddingRight: '24px',
                        gap: '24px',
                        paddingTop: '94px',
                        paddingBottom: '20px'
                    }}
                >
                    <div
                        style={{
                            width: '167.17px',
                            height: '24px',
                            flexShrink: 0
                        }}
                    >
                        <Image
                            src="/munchies-logo.svg"
                            alt="munchies."
                            width={167}
                            height={24}
                            className="object-contain object-left"
                            priority
                        />
                    </div>

                    <div
                        className="flex flex-col"
                        style={{
                            width: '100%',
                            minHeight: '53px',
                            flexShrink: 0
                        }}
                    >
                        <h3 className="text-[12px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Delivery Time</h3>
                        <div className="flex flex-row flex-wrap gap-[10px]" style={{ width: '330px' }}>
                            {[
                                { label: '0-10 min', value: '0-10' },
                                { label: '10-30 min', value: '10-30' },
                                { label: '30-60 min', value: '30-60' },
                                { label: '1 hour+', value: '60+' },
                            ].map((time) => {
                                const isActive = activeDeliveryTimes.includes(time.value);
                                return (
                                    <button
                                        key={time.value}
                                        onClick={() => toggleDeliveryTime(time.value)}
                                        className={clsx(
                                            'rounded-[8px] transition-all duration-200 border whitespace-nowrap flex items-center justify-center',
                                            isActive
                                                ? 'bg-black text-white border-black'
                                                : 'bg-white border-gray-100 hover:border-gray-200'
                                        )}
                                        style={{
                                            width: 'fit-content',
                                            height: 'fit-content',
                                            paddingTop: '8px',
                                            paddingRight: '12px',
                                            paddingBottom: '8px',
                                            paddingLeft: '12px',
                                            borderWidth: '0.6px',
                                            boxShadow: isActive ? 'none' : '-4px 2px 10px rgba(0, 0, 0, 0.01), -16px 9px 18px rgba(0, 0, 0, 0.01), -35px 20px 24px rgba(0, 0, 0, 0), -63px 36px 29px rgba(0, 0, 0, 0), -98px 56px 32px rgba(0, 0, 0, 0)',
                                            color: isActive ? '#FFFFFF' : '#000000'
                                        }}
                                    >
                                        <span
                                            style={{
                                                fontSize: '12px',
                                                lineHeight: '125%',
                                                color: isActive ? '#FFFFFF' : '#000000',
                                                height: '15px',
                                                display: 'block'
                                            }}
                                        >
                                            {time.label}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="w-full" style={{ flexShrink: 0 }}>
                        <CategoryRail
                            filters={filters}
                            activeFilterIds={activeFilterIds}
                            onToggleFilter={toggleFilter}
                        />
                    </div>

                    <h2
                        style={{
                            width: '109px',
                            height: '20px',
                            fontSize: '20px',
                            lineHeight: '100%',
                            color: '#000000',
                            flexShrink: 0
                        }}
                    >
                        Restaurant's
                    </h2>

                    <div className="flex-1 overflow-y-auto -mx-6 px-6">
                        <div className="flex flex-col gap-[17px] pb-16">
                            {filteredRestaurants.map((restaurant) => (
                                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                            ))}
                            {filteredRestaurants.length === 0 && (
                                <div className="text-center py-12 text-gray-500">
                                    No restaurants found matching your filters.
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="hidden md:block px-0 pb-0">
                    <div className="fixed top-[144px] left-[299px] flex flex-row gap-[10px] overflow-x-auto w-fit h-fit max-w-[calc(100vw-339px)]">
                        <CategoryRail
                            filters={filters}
                            activeFilterIds={activeFilterIds}
                            onToggleFilter={toggleFilter}
                        />
                    </div>

                    <h2
                        className="fixed top-[264px] left-[299px] w-[200px] h-[40px]"
                        style={{
                            fontSize: '40px',
                            lineHeight: '100%',
                        }}
                    >
                        Restaurant's
                    </h2>

                    <div className="fixed top-[336px] left-[299px] w-[1015px] h-[640px] overflow-y-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[17px]">
                            {filteredRestaurants.map((restaurant) => (
                                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                            ))}
                        </div>
                        {filteredRestaurants.length === 0 && (
                            <div className="text-center py-12 text-gray-500">
                                No restaurants found matching your filters.
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
