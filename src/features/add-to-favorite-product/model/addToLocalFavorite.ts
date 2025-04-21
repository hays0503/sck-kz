import { useLocalStorage } from 'usehooks-ts';

const useAddToLocalFavorite = () => {
  const [favoriteProducts, setFavoriteProducts] = useLocalStorage<number[]>(
    'favoriteProducts',
    [],
  );

  const addFavoriteProduct = (id: number) => {
    const mapFavoriteProducts = new Set(favoriteProducts);
    mapFavoriteProducts.add(id);
    setFavoriteProducts(Array.from(mapFavoriteProducts));
  };

  return { favoriteProducts, addFavoriteProduct };
};

export default useAddToLocalFavorite;
