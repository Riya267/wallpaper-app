import {
  ReactNode,
  createContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from 'react';
import { getAllWallpapers } from '../services/api';
import { FilterOptionsInterface } from '@/components/FilterModal';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/util/firebase';
import { getDocument } from '@/services/auth';
import { misc } from '@/constants/Misc';

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
  openFilterModal: boolean;
  favourites: FavouritesInterface;
  openReauthenticateModal: boolean;
  isLoggedInStateOnAuthUpdated: boolean;
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
  toggleReauthenticateModalVisibility: (toggle: boolean) => void;
  setLoggedInStateOnAuthChange: () => void;
}

interface AppProviderProps {
  children: ReactNode;
}

const initialState: AppState = {
  isLoggedIn: false,
  userName: '',
  page: 1,
  perPage: 20,
  queryString: '',
  selectedCategory: '',
  wallpapers: [],
  loading: false,
  error: null,
  openFilterModal: false,
  appliedFilters: [],
  scrollMoreWallpapers: true,
  favourites: { wallpapers: [] },
  openReauthenticateModal: false,
  isLoggedInStateOnAuthUpdated: false,
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
  toggleReauthenticateModalVisibility: () => {},
  setLoggedInStateOnAuthChange: () => {},
});

export const ContextProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, setState] = useState<AppState>(initialState);

  const setLoggedInStateOnAuthChange = useCallback(() => {
    if (auth.currentUser?.displayName) {
      signIn(auth.currentUser.displayName);
    }

    if (state.isLoggedIn) {
      const fetchWallpapersAndUpdateState = async () => {
        const favouriteWallpapers = await getDocument(
          misc.FAVOURITES_COLLECTION_NAME,
          auth.currentUser?.uid as string
        );
        if (favouriteWallpapers) {
          updateFavourites(favouriteWallpapers as FavouritesInterface);
        }
      };
      fetchWallpapersAndUpdateState();
    }

    setState((prevState) => ({
      ...prevState,
      isLoggedInStateOnAuthUpdated: true,
    }));
  }, [state.isLoggedIn]);

  const toggleReauthenticateModalVisibility = useCallback((toggle: boolean) => {
    setState((prevState) => ({
      ...prevState,
      openReauthenticateModal: toggle,
    }));
  }, []);

  const updateFavourites = useCallback((favourites: FavouritesInterface) => {
    setState((prevState) => ({
      ...prevState,
      favourites,
    }));
  }, []);

  const signIn = useCallback((userName: string) => {
    setState((prevState) => ({
      ...prevState,
      isLoggedIn: true,
      userName,
    }));
  }, []);

  const signOff = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      isLoggedIn: false,
      userName: '',
    }));
  }, []);

  const removeFilter = useCallback((filter: string) => {
    setState((prevState) => ({
      ...prevState,
      appliedFilters: prevState.appliedFilters?.map((appliedFilter) => {
        appliedFilter.filterOptions = appliedFilter.filterOptions.filter(
          (option) => option !== filter
        );
        return appliedFilter;
      }),
    }));
  }, []);

  const setSelectedCategory = useCallback((selectedCategory: string) => {
    setState((prevState) => ({
      ...prevState,
      selectedCategory: selectedCategory ?? '',
    }));
  }, []);

  const setQueryString = useCallback((queryString: string) => {
    setState((prevState) => ({
      ...prevState,
      queryString: queryString ?? '',
    }));
  }, []);

  const setPage = useCallback((page: number) => {
    setState((prevState) => ({
      ...prevState,
      page: page ?? 1,
    }));
  }, []);

  const setShowMoreWallpapers = useCallback((hasMore: boolean) => {
    setState((prevState) => ({
      ...prevState,
      scrollMoreWallpapers: hasMore,
    }));
  }, []);

  const setAppliedFilters = useCallback(
    (selectedFilters: Array<FilterOptionsInterface>) => {
      setState((prevState) => ({
        ...prevState,
        appliedFilters: selectedFilters,
      }));
    },
    []
  );

  const fetchWallpapers = useCallback(async () => {
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
            state.page === 1
              ? allPosts
              : [...prevState.wallpapers, ...allPosts],
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
  }, [
    state.page,
    state.perPage,
    state.queryString,
    state.selectedCategory,
    state.appliedFilters,
  ]);

  const toggleFilterModalVisibility = useCallback((toggle: boolean) => {
    setState((prevState) => ({ ...prevState, openFilterModal: toggle }));
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setState(initialState);
      } else {
        setLoggedInStateOnAuthChange();
      }
    });

    return () => unsubscribe();
  }, [setLoggedInStateOnAuthChange]);

  const contextValue = useMemo(
    () => ({
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
      toggleReauthenticateModalVisibility,
      setLoggedInStateOnAuthChange,
    }),
    [
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
      toggleReauthenticateModalVisibility,
      setLoggedInStateOnAuthChange,
    ]
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
