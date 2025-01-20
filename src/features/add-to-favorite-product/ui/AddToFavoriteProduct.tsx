"use client";
import React, { useMemo, useCallback } from "react";
import { Button, Flex } from "antd";
import { motion } from "framer-motion";
import { useAddToLocalFavorite, useRemoveToLocalFavorite } from "../model";

// Анимация для иконки сердца
const Heart: React.FC<{ isFavorite: boolean }> = ({ isFavorite }) => {
  return (
    <motion.svg
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        rotate: isFavorite ? 360 : 0,
        fill: isFavorite ? "#FF0000" : "#FFFFFF",
      }}
      exit={{ scale: 0.95, opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      width="25"
      height="25"
      viewBox="0 0 25 25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.85"
        d="M16.6111 3.5C20.1333 3.5 22.5 6.8525 22.5 9.98C22.5 16.3138 12.6778 21.5 12.5 21.5C12.3222 21.5 2.5 16.3138 2.5 9.98C2.5 6.8525 4.86667 3.5 8.38889 3.5C10.4111 3.5 11.7333 4.52375 12.5 5.42375C13.2667 4.52375 14.5889 3.5 16.6111 3.5Z"
        stroke="#464646"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
};

// Основной компонент
const AddToFavoriteProduct: React.FC<{ prod_id: number }> = ({ prod_id }) => {
  const { favoriteProducts, addFavoriteProduct } = useAddToLocalFavorite();
  const { removeFavoriteProduct } = useRemoveToLocalFavorite();

  const isFavorite = useMemo(() => favoriteProducts.includes(prod_id), [favoriteProducts, prod_id]);

  const action = useCallback(
    () => (isFavorite ? removeFavoriteProduct(prod_id) : addFavoriteProduct(prod_id)),
    [isFavorite, prod_id, addFavoriteProduct, removeFavoriteProduct]
  );

  return (
    <Flex style={{ width: "25px", height: "25px" }} justify="center" align="center">
      <Button type={"text"} shape="default" size="small" onClick={action}>
        <Heart isFavorite={isFavorite} />
      </Button>
    </Flex>
  );
};

export default React.memo(AddToFavoriteProduct);
