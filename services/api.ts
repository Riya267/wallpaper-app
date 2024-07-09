import { FilterOptionsInterface } from '@/components/FilterModal';

const API_URL = `${process.env.EXPO_PUBLIC_PIXA_API_BASE_URL}?key=${process.env.EXPO_PUBLIC_PIXA_AUTH_KEY}`;

interface GetPostsInterface {
  page: number;
  pageSize: number;
  category?: string;
  querystring?: string;
  appliedFilters?: FilterOptionsInterface[];
}

const getAllWallpapers = async ({
  page,
  pageSize,
  category,
  querystring,
  appliedFilters = [],
}: GetPostsInterface) => {
  try {
    const filters = appliedFilters
      .map((filter) => `${filter.mappingKey}=${filter.filterOptions.join(',')}`)
      .join('&');

    const urlParams = new URLSearchParams({
      per_page: String(pageSize),
      page: String(page),
      ...(querystring && { q: querystring }),
      ...(category && { category }),
    });

    const apiUrl = `${API_URL}&${urlParams.toString()}${filters ? `&${filters}` : ''}`;

    const response = await fetch(apiUrl, {
      method: 'GET',
    });

    const allPosts = await response.json();
    return allPosts?.hits;
  } catch (error) {
    console.error('Error fetching wallpapers:', error);
    throw error;
  }
};

export { getAllWallpapers };
