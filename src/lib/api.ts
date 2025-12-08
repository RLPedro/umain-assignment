import axios from 'axios';

const apiBaseUrl = process.env.API_BASE_URL;
const imageBaseUrl = process.env.IMAGE_BASE_URL;

export interface Restaurant {
  id: string;
  name: string;
  rating: number;
  filter_ids: string[];
  image_url: string;
  delivery_time_minutes: number;
  price_range_id: string;
  isOpen?: boolean;
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

export interface RestaurantStatus {
  restaurant_id: string;
  is_open: boolean;
}

export const api = axios.create({
  baseURL: apiBaseUrl
});

export const getRestaurants = async (): Promise<Restaurant[]> => {
  try {
    const response = await api.get<RestaurantsResponse>('/restaurants');
    return response.data.restaurants.map(restaurant => ({
      ...restaurant,
      image_url: `${imageBaseUrl}${restaurant.image_url}`
    }));
  } catch (error) {
    console.error('Failed to fetch restaurants: ', error);
    throw new Error('Failed to fetch restaurants');
  }

};

export const getFilters = async (): Promise<Filter[]> => {
  try {
    const response = await api.get<FiltersResponse>('/filter');
    return response.data.filters.map(filter => ({
      ...filter,
      image_url: `${imageBaseUrl}${filter.image_url}`
    }));
  } catch (error) {
    console.error('Failed to fetch filters: ', error);
    throw new Error('Failed to fetch filters');
  }

};

export const getPriceRanges = async (): Promise<PriceRange[]> => {
  try {
    const response = await api.get<PriceRange[]>('/price-range');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch price ranges: ', error);
    throw new Error('Failed to fetch price ranges');
  }
};

export const getRestaurantStatus = async (id: string): Promise<boolean> => {

  try {
    const response = await api.get<RestaurantStatus>(`/open/${id}`);
    return response.data.is_open;
  } catch (error) {
    console.error(`Failed to fetch status for restaurant ${id}`, error);
    throw new Error(`Failed to fetch status for restaurant ${id}`);
  }
};
