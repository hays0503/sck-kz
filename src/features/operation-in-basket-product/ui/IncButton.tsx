import { Button } from "antd";
import { useBasketAdd } from "../model";
import { CSSProperties } from "react";

const IncButton: React.FC<{ prod_id: number }> = ({ prod_id }) => {

    const styleButton: CSSProperties = {
        color: "gray",
        width: "32px",
        height: "32px",
        border: "none",
        backgroundColor: "#F5F5F5",
      };

    const _addAction = useBasketAdd({ prod_id });
    const addAction = async () => {
        if ('vibrate' in navigator) {
            navigator.vibrate([50, 30, 80, 30, 50]);
        }
        _addAction()
    }
    return (
        <Button
            onClick={addAction}
            icon={
            <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                d="M5 10H10M10 10H15M10 10V15M10 10V5"
                stroke="#464646"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                />
            </svg>
            }
            style={styleButton}
        />
        );
};

export default IncButton
    
