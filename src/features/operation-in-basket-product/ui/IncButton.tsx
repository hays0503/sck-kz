import { Button } from "antd";
import { useBasketAdd } from "../model";
import { CSSProperties } from "react";

interface IncButtonProps { 
    prod_id: number,
    colorBg?:string,
    color?:string
    border?:string 
}

const IncButton: React.FC<IncButtonProps> = ({ prod_id,colorBg="#F5F5F5",color="gray",border="none"}) => {

    const styleButton: CSSProperties = {
        color:color,
        width: "32px",
        height: "32px",
        border: border,
        backgroundColor: colorBg,
    };

    const [_addAction, msg] = useBasketAdd({ prod_id });
    const addAction = async () => {
        if ('vibrate' in navigator) {
            navigator.vibrate([50, 30, 80, 30, 50]);
        }
        _addAction()
    }
    return (
        <>{msg}
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
                            stroke={color}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                }
                style={styleButton}
            /></>
    );
};

export default IncButton

