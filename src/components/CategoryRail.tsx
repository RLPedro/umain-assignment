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
        <div className="w-full overflow-x-auto md:pl-0 scrollbar-on-hover">
            <div className="flex gap-[10px] min-w-max pb-[2px]">
                {filters.map((filter) => {
                    const isActive = activeFilterIds.includes(filter.id);
                    return (
                        <button
                            key={filter.id}
                            onClick={() => onToggleFilter(filter.id)}
                            className={clsx(
                                'relative flex items-center justify-between p-4 rounded-[8px] transition-all duration-200 border-[0.6px] text-left overflow-hidden group w-[160px] h-[80px]',
                                isActive
                                    ? 'bg-[var(--color-brand)] border-[var(--color-brand)] shadow-md'
                                    : 'bg-white border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md'
                            )}
                        >
                            <span
                                className={clsx('font-medium z-10 absolute top-4 left-3 text-[14px] leading-none')}
                                style={{
                                    color: isActive ? 'var(--color-card)' : 'var(--color-text-secondary)',
                                }}
                            >
                                {filter.name}
                            </span>
                            <span className="absolute left-[90px] top-1/2 -translate-y-1/2 z-0 flex items-center justify-center w-[80px] h-[80px]">
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
