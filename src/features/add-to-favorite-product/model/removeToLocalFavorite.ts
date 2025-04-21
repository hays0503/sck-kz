import { useLocalStorage } from 'usehooks-ts';

const useRemoveToLocalFavorite = () => {
  const [favoriteProducts, setFavoriteProducts] = useLocalStorage<number[]>(
    'favoriteProducts',
    [],
  );

  const removeFavoriteProduct = (id: number) => {
    const mapFavoriteProducts = new Set(favoriteProducts);
    mapFavoriteProducts.delete(id);
    setFavoriteProducts(Array.from(mapFavoriteProducts));
  };

  return { favoriteProducts, removeFavoriteProduct };
};

export default useRemoveToLocalFavorite;
