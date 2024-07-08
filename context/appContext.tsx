import { ReactNode, createContext, useEffect, useState } from 'react';
import { getAllWallpapers } from '../util/api';
import { FilterOptionsInterface } from '@/components/filterModal';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/util/firebase';
import { getDocument } from '@/util/auth';
import { misc } from '@/constants/misc';

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
  openReauthicateModal: boolean;
  isLoggedInStateonAuthUpdated: boolean;
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
  toggleReauthicateModalVisibility: (toggle: boolean) => void;
  setLoggedInStateOnAuthChange: () => void;
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
  openReauthicateModal: false,
  isLoggedInStateonAuthUpdated: false,
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
  toggleReauthicateModalVisibility: () => {},
  setLoggedInStateOnAuthChange: () => {},
});

export const ContextProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, setState] = useState<AppState>(initialState);

  const setLoggedInStateOnAuthChange = () => {
    console.log('setLoggedInStateOnAuthChange', state.isLoggedIn);
    signIn(auth.currentUser?.displayName!);
    if (state.isLoggedIn) {
      async function fetchWallpapersAndUpdateState() {
        const favouriteWallpapers = await getDocument(
          misc.FAVOURITES_COLLECTION_NAME,
          auth.currentUser?.uid as string
        );
        if (favouriteWallpapers)
          updateFavourites(favouriteWallpapers as FavouritesInterface);
      }
      fetchWallpapersAndUpdateState();
    }
    setState((prevState) => ({
      ...prevState,
      isLoggedInStateonAuthUpdated: true,
    }));
  };

  const toggleReauthicateModalVisibility = (toggle: boolean) => {
    setState((prevState) => ({
      ...prevState,
      openReauthicateModal: toggle,
    }));
  };

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('onAuthStateChanged unsubscribe', user);
      if (!user) {
        setState(initialState);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AppContext.Provider
      value={{
        state,
        setLoggedInStateOnAuthChange,
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
        toggleReauthicateModalVisibility,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
