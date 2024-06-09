import { ReactNode, createContext, useState } from 'react';
import { getAllPosts } from '../util/api';

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
    selectedCategory: string
    queryString: string
    wallpapers: Array<WallpaperInterface>
    loading: boolean
    error: string | null
}
  
interface AppContextProps {
    state: AppState;
    fetchPosts: () => void;
    updateQueryString: (query: string) => void;
}

interface AppProviderProps {
    children: ReactNode;
}

const initialState = {
    selectedCategory: "",
    queryString: "",
    wallpapers: [],
    loading: false,
    error: null,
}

export const AppContext = createContext<AppContextProps>({
    state: initialState,
    fetchPosts: () => {},
    updateQueryString: () => {}
  });

export const ContextProvider:React.FC<AppProviderProps> = ({ children }) => {
  const [state, setState] = useState<AppState>(initialState);

  const updateQueryString = async (query: string) => {
    setState((prevState) => ({ ...prevState, loading: true, error: null, queryString: query }));
  }

  const fetchPosts = async () => {
    setState((prevState) => ({ ...prevState, loading: true, error: null }));
    try {
      const allPosts = await getAllPosts({page: 1, pageSize: 10, querystring: state.queryString, category: state.selectedCategory});
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

  return (
    <AppContext.Provider value={{ state, fetchPosts, updateQueryString }}>
      {children}
    </AppContext.Provider>
  );
};
