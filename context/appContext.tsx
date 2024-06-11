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

type fetchPostsProps = {
  queryString?: string
  selectedCategory?: string
  appliedFilters?:  Array<FilterOptionsInterface> 
}

interface AppState extends fetchPostsProps{
  wallpapers: Array<WallpaperInterface>
  loading: boolean
  error: string | null
  openfilterModal: boolean
}
  
interface AppContextProps {
    state: AppState;
    fetchWallpapers: ({ queryString, selectedCategory }: fetchPostsProps) => void;
    toggleFilterModalVisibility: (toggle: boolean) => void;
    removeFilter: (filter: string) => void;
    setSelectedCategory: (selectedCategory: string) => void;
    setQueryString: (queryString: string) => void;
}

interface AppProviderProps {
    children: ReactNode;
}

const initialState = {
    queryString: "",
    selectedCategory: "",
    wallpapers: [],
    loading: false,
    error: null,
    openfilterModal: false,
    appliedfilters: []
}

export const AppContext = createContext<AppContextProps>({
    state: initialState,
    fetchWallpapers: () => {},
    toggleFilterModalVisibility: () => {},
    removeFilter: () => {},
    setSelectedCategory: () => {},
    setQueryString: () => {},
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

  const fetchWallpapers = async ({ queryString, selectedCategory, appliedFilters }: fetchPostsProps) => {
    setState((prevState) => ({ ...prevState, loading: true, error: null, selectedCategory: selectedCategory ?? "", queryString: queryString ?? "", appliedFilters: appliedFilters ?? [] }));
    try {
      const allPosts = await getAllWallpapers({page: 1, pageSize: 10, querystring: queryString, category: selectedCategory, appliedFilters: appliedFilters});
      setState((prevState) => ({
        ...prevState,
        wallpapers: allPosts,
        loading: false,
        error: null
      }));
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
    <AppContext.Provider value={{ state, fetchWallpapers, toggleFilterModalVisibility, removeFilter, setSelectedCategory, setQueryString }}>
      {children}
    </AppContext.Provider>
  );
};
