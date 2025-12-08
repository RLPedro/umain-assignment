import Image from 'next/image';
import { Restaurant } from '@/lib/api';
import clsx from 'clsx';

interface RestaurantCardProps {
    restaurant: Restaurant;
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
    const { isOpen } = restaurant;

    return (
        <div className="bg-white rounded-[8px] relative overflow-hidden transition-all duration-200 flex flex-col justify-between w-full max-w-[327px] h-[202px] border-[0.6px] border-[var(--color-border)] p-4 shadow-sm hover:shadow-md">
            <div className="absolute flex items-center justify-center -right-[30px] -top-[30px] w-[140px] h-[140px]"
                style={{ opacity: isOpen ? 1 : 0.2 }}
            >
                <Image
                    src={restaurant.image_url}
                    alt={restaurant.name}
                    width={140}
                    height={140}
                    className="object-contain"
                />
            </div>

            <div className="flex flex-row gap-1 relative z-10 w-fit max-w-[138px] h-fit min-h-[28px]">
                <div className="flex items-center bg-white shadow-sm border-[var(--color-border)] rounded-[88px] border-[0.6px] py-2 pr-3 pl-2.5 gap-1">
                    <div className={clsx("w-2 h-2 rounded-full", isOpen ? "bg-[var(--color-brand)]" : "bg-black")} />
                    <span className="text-[10px] font-medium">{isOpen ? "Open" : "Closed"}</span>
                </div>
                {isOpen && (
                    <div className="bg-white shadow-sm border-[var(--color-border)] text-[10px] font-medium rounded-[88px] border-[0.6px] py-2 pr-3 pl-2.5">
                        {restaurant.delivery_time_minutes} min
                    </div>
                )}
            </div>

            {!isOpen && (
                <div className="absolute rounded-[4px] flex items-center justify-center z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-fit max-w-[157px] h-fit min-h-[28px] py-2 pr-3 pl-2.5 gap-1 border-[0.6px] border-[var(--color-border)] bg-[var(--color-background)] shadow-sm">
                    <span className="text-[12px] font-normal leading-[100%] tracking-[-0.5px] text-black">
                        Opens tomorrow at 12pm
                    </span>
                </div>
            )}

            <div className="flex flex-row items-center justify-between relative z-10 w-full h-fit min-h-[32px]"
                style={{ opacity: isOpen ? 1 : 0.2 }}
            >
                <div className="flex-1 min-w-0 mr-2 h-6">
                    <h3 className="truncate text-2xl leading-6">
                        {restaurant.name}
                    </h3>
                </div>

                <button className="rounded-full flex items-center justify-center transition-colors bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] w-8 h-8">
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
