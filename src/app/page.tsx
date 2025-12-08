import { getRestaurants, getFilters, getPriceRanges, getRestaurantStatus } from '@/lib/api';
import { RestaurantApp } from '@/components/RestaurantApp';

export default async function Home() {
  const [restaurants, filters, priceRanges] = await Promise.all([
    getRestaurants(),
    getFilters(),
    getPriceRanges(),
  ]);

  const restaurantsStatusData = await Promise.allSettled(
    restaurants.map(async (restaurant) => {
      const isOpen = await getRestaurantStatus(restaurant.id);
      return { ...restaurant, isOpen };
    })
  );

  const restaurantsWithStatus = restaurantsStatusData.map((result, index) => {
    if (result.status === 'fulfilled') {
      return result.value;
    }
    // fallback to closed status if fetching fails, logs error
    console.error(`Failed to fetch status for ${restaurants[index].name}:`, result.reason);
    return { ...restaurants[index], isOpen: false };
  });

  return (
    <RestaurantApp
      restaurants={restaurantsWithStatus}
      filters={filters}
      priceRanges={priceRanges}
    />
  );
}
