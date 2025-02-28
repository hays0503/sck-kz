import { Flex, Popover } from "antd";
import CatalogNavigation from "./CatalogNavigation";
import { CatalogSubMenu } from "./CatalogSubMenu";
import { MappedCategoryType } from "api-mapping/category/all/type";
import { useState } from "react";

export default function CatalogPopover({
  children,
  isOpen,
  setIsOpen,
  CategoriesData,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  CategoriesData: MappedCategoryType[];
}) {

  const [selectCategory, setSelectCategory] = useState<MappedCategoryType>(CategoriesData[0]);

  return (<Popover
        trigger="click"
        placement="bottomLeft"
        styles={{
          root:
          {
            left: "0px",
            width: "100%",
            height:  "100%",
            overflow: "clip",
            position: "fixed",
            backgroundColor:"transparent"
          },
          body:{
            backgroundColor:"transparent"
          }
        }}
        content={
          <Flex
            style={{
              display: "flex",
              width: "100%",
              height: "100dvh",
              backgroundColor:"transparent"
            }}
            justify="center"
          >
            <Flex style={{width:"90%",padding:"5px",height:"100%",backgroundColor:"#ffff"}}>
              <CatalogNavigation
                CategoriesData={CategoriesData}
                HoveredElement={selectCategory}
                setHoveredElement={setSelectCategory}
                style={{
                  width: "30%",
                }}
              />
              <CatalogSubMenu Categories={selectCategory.children} />
            </Flex>
          </Flex>
        }
        arrow={false}
        onOpenChange={() => {
          setIsOpen(!isOpen);
        }}
      >
        {children}
      </Popover>

  );
}
