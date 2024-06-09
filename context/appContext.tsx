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

type fetchPostsProps = {
  queryString?: string
  selectedCategory?: string
}
interface AppState extends fetchPostsProps{
    wallpapers: Array<WallpaperInterface>
    loading: boolean
    error: string | null
}
  
interface AppContextProps {
    state: AppState;
    fetchPosts: ({ queryString, selectedCategory }: fetchPostsProps) => void;
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
}

export const AppContext = createContext<AppContextProps>({
    state: initialState,
    fetchPosts: () => {},
  });

export const ContextProvider:React.FC<AppProviderProps> = ({ children }) => {
  const [state, setState] = useState<AppState>(initialState);

  const fetchPosts = async ({ queryString, selectedCategory }: fetchPostsProps) => {
    setState((prevState) => ({ ...prevState, loading: true, error: null, selectedCategory: selectedCategory ?? "", queryString: queryString ?? "" }));
    try {
      const allPosts = await getAllPosts({page: 1, pageSize: 10, querystring: queryString, category: selectedCategory});
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
    <AppContext.Provider value={{ state, fetchPosts }}>
      {children}
    </AppContext.Provider>
  );
};
