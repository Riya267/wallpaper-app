import { ReactNode, createContext, useState } from 'react';
import { getAllWallpapers } from '../util/api';
import { FilterOptionsInterface } from '@/components/filterModal';

export interface WallpaperInterface {
  id: number;
  pageURL: string;
  previewURL: string;
  tags: string;
  webformatURL: string;
  imageWidth: number;
  imageHeight: number;
}
export interface FavouritesInterface {
  wallpapers: Array<WallpaperInterface>;
}

interface AppState {
  isLoggedIn: boolean;
  userName: string;
  page: number;
  perPage: number;
  queryString?: string;
  selectedCategory?: string;
  appliedFilters?: Array<FilterOptionsInterface>;
  wallpapers: Array<WallpaperInterface>;
  scrollMoreWallpapers: boolean;
  loading: boolean;
  error: string | null;
  openfilterModal: boolean;
  favourites: FavouritesInterface;
}
interface AppContextProps {
  state: AppState;
  fetchWallpapers: () => void;
  toggleFilterModalVisibility: (toggle: boolean) => void;
  removeFilter: (filter: string) => void;
  setSelectedCategory: (selectedCategory: string) => void;
  setQueryString: (queryString: string) => void;
  setPage: (page: number) => void;
  setShowMoreWallpapers: (hasMore: boolean) => void;
  setAppliedFilters: (selectedFilters: Array<FilterOptionsInterface>) => void;
  signIn: (userName: string) => void;
  signOff: () => void;
  updateFavourites: (favourites: FavouritesInterface) => void;
}

interface AppProviderProps {
  children: ReactNode;
}

const initialState = {
  isLoggedIn: false,
  userName: '',
  page: 1,
  perPage: 20,
  queryString: '',
  selectedCategory: '',
  wallpapers: [],
  loading: false,
  error: null,
  openfilterModal: false,
  appliedfilters: [],
  scrollMoreWallpapers: true,
  favourites: {
    wallpapers: [],
  },
};

export const AppContext = createContext<AppContextProps>({
  state: initialState,
  fetchWallpapers: () => {},
  toggleFilterModalVisibility: () => {},
  removeFilter: () => {},
  setSelectedCategory: () => {},
  setQueryString: () => {},
  setPage: () => {},
  setShowMoreWallpapers: () => {},
  setAppliedFilters: () => {},
  signIn: () => {},
  signOff: () => {},
  updateFavourites: () => {},
});

export const ContextProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, setState] = useState<AppState>(initialState);

  const updateFavourites = (favourites: FavouritesInterface) => {
    setState((prevState) => ({
      ...prevState,
      favourites: favourites,
    }));
  };

  const signIn = (userName: string) => {
    setState((prevState) => ({
      ...prevState,
      isLoggedIn: true,
      userName: userName,
    }));
  };

  const signOff = () => {
    setState((prevState) => ({
      ...prevState,
      isLoggedIn: false,
      userName: '',
    }));
  };

  const removeFilter = (filter: string) => {
    setState((prevState) => ({
      ...prevState,
      appliedFilters: prevState.appliedFilters?.filter(
        (appliedFilter) => !appliedFilter.filterOptions.includes(filter)
      ),
    }));
  };

  const setSelectedCategory = (selectedCategory: string) => {
    setState((prevState) => ({
      ...prevState,
      selectedCategory: selectedCategory ?? '',
    }));
  };

  const setQueryString = (queryString: string) => {
    setState((prevState) => ({
      ...prevState,
      queryString: queryString ?? '',
    }));
  };

  const setPage = (page: number) => {
    setState((prevState) => ({
      ...prevState,
      page: page ?? 1,
    }));
  };

  const setShowMoreWallpapers = (hasMore: boolean) => {
    setState((prevState) => ({
      ...prevState,
      scrollMoreWallpapers: hasMore,
    }));
  };

  const setAppliedFilters = (
    selectedFilters: Array<FilterOptionsInterface>
  ) => {
    setState((prevState) => ({
      ...prevState,
      appliedFilters: selectedFilters,
    }));
  };

  const fetchWallpapers = async () => {
    setState((prevState) => ({ ...prevState, loading: true, error: null }));
    try {
      const allPosts = await getAllWallpapers({
        page: state.page,
        pageSize: state.perPage,
        querystring: state.queryString,
        category: state.selectedCategory,
        appliedFilters: state.appliedFilters,
      });
      if (allPosts?.length === 0) {
        setState((prevState) => ({
          ...prevState,
          loading: false,
          error: null,
          scrollMoreWallpapers: false,
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          wallpapers:
            state.page === 1 && state.wallpapers.length > 0
              ? allPosts
              : [...state.wallpapers, ...allPosts],
          loading: false,
          error: null,
          scrollMoreWallpapers: true,
        }));
      }
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        loading: false,
        error: 'Failed to fetch user data',
      }));
    }
  };

  const toggleFilterModalVisibility = (toggle: boolean) => {
    setState((prevState) => ({ ...prevState, openfilterModal: toggle }));
  };

  return (
    <AppContext.Provider
      value={{
        state,
        fetchWallpapers,
        toggleFilterModalVisibility,
        removeFilter,
        setSelectedCategory,
        setQueryString,
        setPage,
        setShowMoreWallpapers,
        setAppliedFilters,
        signIn,
        signOff,
        updateFavourites,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
