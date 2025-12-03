import { getRestaurants, getFilters, getPriceRanges } from '@/lib/api';
import { RestaurantApp } from '@/components/RestaurantApp';

export default async function Home() {
  const [restaurants, filters, priceRanges] = await Promise.all([
    getRestaurants(),
    getFilters(),
    getPriceRanges(),
  ]);

  return (
    <RestaurantApp restaurants={restaurants} filters={filters} priceRanges={priceRanges} />
  );
}
