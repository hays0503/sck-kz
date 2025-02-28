import { Popover } from "antd";
import CatalogNavigation from "./CatalogNavigation";
import { CatalogSubMenu } from "./CatalogSubMenu";
import { MappedCategoryType } from "api-mapping/category/all/type";

export default function CatalogPopover({
  children,
  isOpen,
  setIsOpen,
  CategoriesData,
  selectCategory,
  setSelectCategory,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  CategoriesData: MappedCategoryType[];
  selectCategory: MappedCategoryType;
  setSelectCategory: (data: MappedCategoryType) => void;
}) {
  return (
    <div >
      <Popover
        trigger="click"
        placement="topLeft"
        styles={{
          root:
          {
            left: "0px",
            width: "100dvw",
            height: "100dvh",
            overflow: "auto",
            position: "fixed",
          }
        }}
        content={
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "100dvh",
            }}
          >
            <CatalogNavigation
              CategoriesData={CategoriesData}
              HoveredElement={selectCategory}
              setHoveredElement={setSelectCategory}
              style={{
                width: "30%",
              }}
            />
            <CatalogSubMenu Categories={selectCategory.children} />
          </div>
        }
        arrow={false}
        onOpenChange={() => {
          setIsOpen(!isOpen);
        }}
      >
        {children}
      </Popover>
    </div>

  );
}
