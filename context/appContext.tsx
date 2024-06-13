import { ReactNode, createContext, useState } from 'react';
import { getAllWallpapers } from '../util/api';
import { FilterOptionsInterface } from '@/components/filterModal';

export interface WallpaperInterface {
    id: number
    pageURL: string
    type: string
    tags: string
    previewURL: string
    previewWidth: number
    previewHeight: number
    webformatURL: string
    webformatWidth: number
    webformatHeight: number
    largeImageURL: string
    imageWidth: number
    imageHeight: number
}

interface AppState {
  page: number
  perPage: number
  queryString?: string
  selectedCategory?: string
  appliedFilters?:  Array<FilterOptionsInterface> 
  wallpapers: Array<WallpaperInterface>
  scrollMoreWallpapers: boolean
  loading: boolean
  error: string | null
  openfilterModal: boolean
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
}

interface AppProviderProps {
    children: ReactNode;
}

const initialState = {
    page: 1,
    perPage: 20,
    queryString: "",
    selectedCategory: "",
    wallpapers: [],
    loading: false,
    error: null,
    openfilterModal: false,
    appliedfilters: [],
    scrollMoreWallpapers: true,
}

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
  });

export const ContextProvider:React.FC<AppProviderProps> = ({ children }) => {
  const [state, setState] = useState<AppState>(initialState);

  const removeFilter = (filter: string) => {
    setState(prevState => ({
      ...prevState,
      appliedFilters: prevState.appliedFilters?.filter(appliedFilter => !appliedFilter.filterOptions.includes(filter))
    }));
  };

  const setSelectedCategory = (selectedCategory: string) => {
    setState((prevState) => ({ 
      ...prevState, 
      selectedCategory: selectedCategory ?? ""
    }));
  }

  const setQueryString = (queryString: string) => {
    setState((prevState) => ({ 
      ...prevState, 
      queryString: queryString ?? ""
    }));
  }

  const setPage = (page: number) => {
    setState((prevState) => ({ 
      ...prevState, 
      page: page ?? 1
    }));
  }

  const setShowMoreWallpapers = (hasMore: boolean) => {
    setState((prevState) => ({ 
      ...prevState, 
      scrollMoreWallpapers: hasMore
    }));
  }

  const setAppliedFilters = (selectedFilters: Array<FilterOptionsInterface>) => {
    setState((prevState) => ({ 
      ...prevState, 
      appliedFilters: selectedFilters
    }));
  }

  const fetchWallpapers = async () => {
    setState((prevState) => ({ ...prevState, loading: true, error: null }));
    try {
      const allPosts = await getAllWallpapers({ page: state.page, pageSize: state.perPage, querystring: state.queryString, category: state.selectedCategory, appliedFilters: state.appliedFilters });
      if(allPosts?.length === 0) {
        setState((prevState) => ({
          ...prevState,
          loading: false,
          error: null,
          scrollMoreWallpapers: false
        }));
      } else{
        setState((prevState) => ({
          ...prevState,
          wallpapers: state.page === 1 && state.wallpapers.length > 0 ? allPosts : [...state.wallpapers, ...allPosts],
          loading: false,
          error: null,
          scrollMoreWallpapers: true
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
    setState((prevState) => ({ ...prevState, openfilterModal: toggle}));
  }

  return (
    <AppContext.Provider value={{ state, fetchWallpapers, toggleFilterModalVisibility, removeFilter, setSelectedCategory, setQueryString, setPage, setShowMoreWallpapers, setAppliedFilters }}>
      {children}
    </AppContext.Provider>
  );
};
