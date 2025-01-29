"use client";
import { Link } from "@/i18n/routing";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import Image from "next/image";

interface ILogoSCKProps {
  readonly size?: "small" | "medium" | "large";
}

const LogoSCK: React.FC<ILogoSCKProps> = ({ size = "small" }) => {
  const currentCity = useGetCityParams();

  const sizeLogo = {
    small: {
      div: {
        width: 82,
        height: 44,
      },
      image: {
        width: 58,
        height: 32,
      },
    },
    medium: {
      div: {
        width: 82 * 1.5,
        height: 44 * 1.5,
      },
      image: {
        width: 58 * 1.5,
        height: 32 * 1.5,
      },
    },
    large: {
      div: {
        width: 82 * 2,
        height: 44 * 2,
      },
      image: {
        width: 58 * 2,
        height: 32 * 2,
      },
    },
  };

  return (
    <>
      <Link href={`/city/${currentCity}/main`} prefetch={true}>
        <div
          style={{
            position: "relative",
            width: sizeLogo[size].div.width,
            height: sizeLogo[size].div.height,
            backgroundColor: "#FFC00E",
            padding: "4px,12px,4px,12px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "4px",
          }}
        >
          <Image
            alt="logo sck"
            src={"/logo.svg"}
            width={sizeLogo[size].image.width}
            height={sizeLogo[size].image.height}
            style={{ objectFit: "contain", objectPosition: "center center" }}
          />
        </div>
      </Link>
    </>
  );
};
export default LogoSCK;
