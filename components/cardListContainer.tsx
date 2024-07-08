import React from 'react';
import useWallpapers from '@/util/useWallpapers';
import CardList from './cardList';

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
