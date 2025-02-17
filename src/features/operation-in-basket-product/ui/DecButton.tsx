import { Button } from "antd";
import { CSSProperties } from "react";
import { useBasketDec } from "../model";

const DecButton: React.FC<{ prod_id: number, count: number }> = ({ prod_id,count }) => {


    const styleButtonDeleted: CSSProperties = {
        backgroundColor: `${count == 1 ? "#fef2f2" : "#F5F5F5"}`,
        color: "gray",
        width: "32px",
        height: "32px",
        border: "none",
      };
    
      const delIcon =
        count == 1 ? (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.6673 8.33333V14.1667M8.33398 8.33333V14.1667M5.00065 5V14.8333C5.00065 15.7668 5.00065 16.2331 5.18231 16.5897C5.3421 16.9033 5.59688 17.1587 5.91048 17.3185C6.26665 17.5 6.73315 17.5 7.66474 17.5H12.3366C13.2682 17.5 13.734 17.5 14.0901 17.3185C14.4037 17.1587 14.6594 16.9033 14.8192 16.5897C15.0007 16.2335 15.0007 15.7675 15.0007 14.8359V5M5.00065 5H6.66732M5.00065 5H3.33398M6.66732 5H13.334M6.66732 5C6.66732 4.22343 6.66732 3.83534 6.79418 3.52905C6.96334 3.12067 7.28758 2.79602 7.69596 2.62687C8.00225 2.5 8.39075 2.5 9.16732 2.5H10.834C11.6106 2.5 11.9988 2.5 12.3051 2.62687C12.7135 2.79602 13.0379 3.12067 13.207 3.52905C13.3339 3.83534 13.334 4.22343 13.334 5M13.334 5H15.0007M15.0007 5H16.6673"
              stroke="#FF3E4A"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 10H15"
              stroke="#464646"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
    
      const _delProduct = useBasketDec({ prod_id });
      const delProduct = async () => {
        if ('vibrate' in navigator) {
          navigator.vibrate([50, 30, 80, 30, 50]);
        }
        _delProduct()
      }
      return <Button
      onClick={delProduct} 
      style={styleButtonDeleted}
      icon={delIcon} />;
};

export default DecButton
    
