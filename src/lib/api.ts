import axios from 'axios';

const API_BASE_URL = 'https://work-test-web-2024-eze6j4scpq-lz.a.run.app/api';

export interface Restaurant {
  id: string;
  name: string;
  rating: number;
  filter_ids: string[];
  image_url: string;
  delivery_time_minutes: number;
  price_range_id: string;
}

export interface Filter {
  id: string;
  name: string;
  image_url: string;
}

export interface RestaurantsResponse {
  restaurants: Restaurant[];
}

export interface FiltersResponse {
  filters: Filter[];
}

export interface PriceRange {
  id: string;
  range: string;
}

export const api = axios.create({
  baseURL: API_BASE_URL,
});

const IMAGE_BASE_URL = 'https://work-test-web-2024-eze6j4scpq-lz.a.run.app';

export const getRestaurants = async (): Promise<Restaurant[]> => {
  const response = await api.get<RestaurantsResponse>('/restaurants');
  return response.data.restaurants.map(restaurant => ({
    ...restaurant,
    image_url: `${IMAGE_BASE_URL}${restaurant.image_url}`
  }));
};

export const getFilters = async (): Promise<Filter[]> => {
  const response = await api.get<FiltersResponse>('/filter');
  return response.data.filters.map(filter => ({
    ...filter,
    image_url: `${IMAGE_BASE_URL}${filter.image_url}`
  }));
};

export interface RestaurantStatus {
  restaurant_id: string;
  is_open: boolean;
}

export const getPriceRanges = async (): Promise<PriceRange[]> => {
  const response = await api.get<PriceRange[]>('/price-range');
  return response.data;
};

export const getRestaurantStatus = async (id: string): Promise<boolean> => {
  try {
    const response = await api.get<RestaurantStatus>(`/open/${id}`);
    return response.data.is_open;
  } catch (error) {
    console.error(`Failed to fetch status for restaurant ${id}`, error);
    return false; // return closed if error
  }
};
