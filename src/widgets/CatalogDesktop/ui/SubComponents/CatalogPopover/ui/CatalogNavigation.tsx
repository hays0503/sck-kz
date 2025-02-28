
import { CSSProperties } from "react";
import CatalogHovered from "./CatalogHovered";
import { MappedCategoryType } from "api-mapping/category/all/type";

const CatalogNavigation = ({
  CategoriesData,
  HoveredElement,
  setHoveredElement,
  style,
}: {
  CategoriesData: MappedCategoryType[];
  HoveredElement: MappedCategoryType;
  setHoveredElement: (Category: MappedCategoryType) => void;
  style?: CSSProperties;
}) => {
  return (
    <>
      <nav style={{...style,overflow:"auto"}}>
        <ul style={{ listStyleType: "none", height: "100dvh", width: "100%" }}>
          {CategoriesData.map((item, index) => (
            <CatalogHovered
              setHoveredElement={setHoveredElement}
              isHover={HoveredElement.id === item.id}
              key={index}
              Category={item}
            />
          ))}
          <li style={{ height: "100px" }}></li>
        </ul>
      </nav>
    </>
  );
};

export default CatalogNavigation;

