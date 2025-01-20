import { CSSProperties } from "react";

const returnStyleActive = (key: string, current: string): CSSProperties  => {
    return {
      color: key === current ? "#3F54CF" : "#8E8E8E",
    };
  };
  
  const returnStyleActiveAccent = (key: string, current: string): string => {
    return key === current ? "#3F54CF" : "#8E8E8E";
  };
  
  const returnStyleActiveBg = (key: string, current: string): string => {
    return key === current ? "#A53594" : "#8E8E8E";
  };

  
  export { returnStyleActive, returnStyleActiveAccent, returnStyleActiveBg };