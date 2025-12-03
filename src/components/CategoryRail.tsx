import Image from 'next/image';
import { Filter } from '@/lib/api';
import clsx from 'clsx';

interface CategoryRailProps {
    filters: Filter[];
    activeFilterIds: string[];
    onToggleFilter: (id: string) => void;
}

export function CategoryRail({ filters, activeFilterIds, onToggleFilter }: CategoryRailProps) {
    return (
        <div
            className="
            w-full 
            overflow-x-auto
            md:mx-0
            md:px-0
            scrollbar-on-hover
            "
        >

            <div
                className="flex gap-[10px] min-w-max"
            >
                {filters.map((filter) => {
                    const isActive = activeFilterIds.includes(filter.id);
                    return (
                        <button
                            key={filter.id}
                            onClick={() => onToggleFilter(filter.id)}
                            className={clsx(
                                'relative flex items-center justify-between p-4 rounded-[8px] transition-all duration-200 border text-left overflow-hidden group',
                                isActive
                                    ? 'bg-[#00703A] border-[#00703A] shadow-md'
                                    : 'bg-white border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md'
                            )}
                            style={{
                                width: '160px',
                                height: '80px',
                                borderWidth: '0.6px',
                                boxShadow: '-4px 2px 10px rgba(0, 0, 0, 0.01), -16px 9px 18px rgba(0, 0, 0, 0.01), -35px 20px 24px rgba(0, 0, 0, 0), -63px 36px 29px rgba(0, 0, 0, 0), -98px 56px 32px rgba(0, 0, 0, 0)'
                            }}
                        >
                            <span
                                className={clsx('font-medium z-10 absolute')}
                                style={{
                                    top: '16px',
                                    left: '12px',
                                    color: isActive ? '#FFFFFF' : '#374151',
                                    fontSize: '14px',
                                    lineHeight: '100%',
                                }}
                            >
                                {filter.name}
                            </span>
                            <span
                                className="absolute left-[90px] top-1/2 -translate-y-1/2 z-0 flex items-center justify-center"
                                style={{ width: '80px', height: '80px' }}
                            >
                                <Image
                                    src={filter.image_url}
                                    alt={filter.name}
                                    width={80}
                                    height={80}
                                    className="object-contain"
                                />
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
