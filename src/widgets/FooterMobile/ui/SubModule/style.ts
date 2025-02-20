import { CSSProperties } from "react";

const returnStyleActive = (key: string, current: string): CSSProperties  => {
    return {
      color: key === current ? "#3F54CF" : "gray",
    };
  };
  
  const returnStyleActiveAccent = (key: string, current: string): string => {
    return key === current ? "#3F54CF" : "gray";
  };
  
  const returnStyleActiveBg = (key: string, current: string): string => {
    return key === current ? "#A53594" : "gray";
  };

  
  export { returnStyleActive, returnStyleActiveAccent, returnStyleActiveBg };