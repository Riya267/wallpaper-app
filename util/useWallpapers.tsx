import { useContext, useEffect } from 'react';
import { AppContext } from '@/context/appContext';
import { getColumns } from '@/util/helper';

const useWallpapers = () => {
  const { state, fetchWallpapers, setPage } = useContext(AppContext);

  useEffect(() => {
    fetchWallpapers();
  }, [
    state.page,
    state.queryString,
    state.selectedCategory,
    state.appliedFilters,
  ]);

  const loadMoreWallpapers = () => {
    if (!state.loading && state.scrollMoreWallpapers) {
      console.log('page', state.page);
      setPage(state.page + 1);
    }
  };

  return {
    wallpapers: state.wallpapers,
    loading: state.loading,
    columns: getColumns(),
    loadMoreWallpapers,
  };
};

export default useWallpapers;
