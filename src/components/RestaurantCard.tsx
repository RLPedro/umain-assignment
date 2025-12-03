import Image from 'next/image';
import { Restaurant, getRestaurantStatus } from '@/lib/api';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

interface RestaurantCardProps {
    restaurant: Restaurant;
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
    const [isOpen, setIsOpen] = useState<boolean | null>(null);

    useEffect(() => {
        let mounted = true;
        getRestaurantStatus(restaurant.id).then((status) => {
            if (mounted) {
                setIsOpen(status);
            }
        });
        return () => {
            mounted = false;
        };
    }, [restaurant.id]);

    const isOpenStatus = isOpen === true;

    return (
        <div
            className="bg-white rounded-[8px] relative overflow-hidden transition-all duration-200 flex flex-col justify-between"
            style={{
                width: '100%',
                maxWidth: '327px',
                height: '202px',
                borderWidth: '0.6px',
                borderColor: 'rgba(0, 0, 0, 0.1)',
                padding: '16px',
                boxShadow: '-4px 2px 10px rgba(0, 0, 0, 0.01), -16px 9px 18px rgba(0, 0, 0, 0.01), -35px 20px 24px rgba(0, 0, 0, 0), -63px 36px 29px rgba(0, 0, 0, 0), -98px 56px 32px rgba(0, 0, 0, 0)'
            }}
        >

            <div
                className="absolute flex items-center justify-center"
                style={{
                    right: '-30px',
                    top: '-30px',
                    width: '140px',
                    height: '140px',
                    opacity: isOpenStatus ? 1 : 0.2
                }}
            >
                <Image
                    src={restaurant.image_url}
                    alt={restaurant.name}
                    width={140}
                    height={140}
                    className="object-contain"
                />
            </div>

            <div
                className="flex flex-row gap-1 relative z-10"
                style={{
                    width: 'fit-content',
                    maxWidth: '138px',
                    height: 'fit-content',
                    minHeight: '28px'
                }}
            >
                {isOpen !== null && (
                    <div
                        className="flex items-center bg-white shadow-sm border-gray-100"
                        style={{
                            borderRadius: '88px',
                            borderWidth: '0.6px',
                            paddingTop: '8px',
                            paddingRight: '12px',
                            paddingBottom: '8px',
                            paddingLeft: '10px',
                            gap: '4px'
                        }}
                    >
                        <div className={clsx("w-2 h-2 rounded-full", isOpenStatus ? "bg-[#00703A]" : "bg-black")} />
                        <span className="text-[10px] font-medium">{isOpenStatus ? "Open" : "Closed"}</span>
                    </div>
                )}
                {isOpenStatus && (
                    <div
                        className="bg-white shadow-sm border-gray-100 text-[10px] font-medium"
                        style={{
                            borderRadius: '88px',
                            borderWidth: '0.6px',
                            paddingTop: '8px',
                            paddingRight: '12px',
                            paddingBottom: '8px',
                            paddingLeft: '10px'
                        }}
                    >
                        {restaurant.delivery_time_minutes} min
                    </div>
                )}
            </div>

            {isOpen === false && (
                <div
                    className="absolute rounded-[4px] flex items-center justify-center z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{
                        width: 'fit-content',
                        maxWidth: '157px',
                        height: 'fit-content',
                        minHeight: '28px',
                        paddingTop: '8px',
                        paddingRight: '12px',
                        paddingBottom: '8px',
                        paddingLeft: '10px',
                        gap: '4px',
                        borderWidth: '0.6px',
                        borderColor: 'rgba(0, 0, 0, 0.1)',
                        backgroundColor: '#FAFAFA',
                        boxShadow: '-4px 2px 10px rgba(0, 0, 0, 0.01), -16px 9px 18px rgba(0, 0, 0, 0.01), -35px 20px 24px rgba(0, 0, 0, 0), -63px 36px 29px rgba(0, 0, 0, 0), -98px 56px 32px rgba(0, 0, 0, 0)'
                    }}
                >
                    <span
                        style={{
                            fontSize: '12px',
                            fontWeight: 400,
                            lineHeight: '100%',
                            letterSpacing: '-0.5px',
                            color: '#000000'
                        }}
                    >
                        Opens tomorrow at 12pm
                    </span>
                </div>
            )}

            <div
                className="flex flex-row items-center justify-between relative z-10"
                style={{
                    width: '100%',
                    height: 'fit-content',
                    minHeight: '32px',
                    opacity: isOpenStatus ? 1 : 0.2
                }}
            >
                <div
                    className="flex-1 min-w-0 mr-2"
                    style={{
                        height: '24px'
                    }}
                >
                    <h3
                        className="truncate"
                        style={{
                            fontSize: '24px',
                            lineHeight: '24px'
                        }}
                    >
                        {restaurant.name}
                    </h3>
                </div>

                <button
                    className="rounded-full flex items-center justify-center transition-colors bg-[#00703A] hover:bg-[#005a2e]"
                    style={{
                        width: '32px',
                        height: '32px'
                    }}
                >
                    <Image
                        src="/arrow-icon.svg"
                        alt="Go to restaurant"
                        width={100}
                        height={100}
                        className="w-4 h-4"
                    />
                </button>
            </div>
        </div>
    );
}
