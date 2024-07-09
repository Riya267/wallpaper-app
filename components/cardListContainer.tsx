import React from 'react';
import useWallpapers from '@/hooks/useWallpapers';
import CardList from './CardList';

const CardListContainer: React.FC<any> = ({ router }) => {
  const { wallpapers, loading, columns, loadMoreWallpapers } = useWallpapers();

  return (
    <CardList
      router={router}
      wallpapers={wallpapers}
      loading={loading}
      columns={columns}
      loadMoreWallpapers={loadMoreWallpapers}
    />
  );
};

export default CardListContainer;
