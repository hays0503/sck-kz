import "@/shared/mock/matchMedia.mock";
import { test, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";

import { NextIntlClientProvider } from "next-intl";

import getCategoriesFromMockData from "@/shared/mock/getCategoriesFromMockData";
import { describe } from "node:test";
import { CatalogSubMenu } from "../CatalogSubMenu";
import { Category } from "@/shared/types/category";
import { selectDataByLangCategory } from "@/shared/tools/selectDataByLang";

describe("CatalogSubMenu Проверка на возврат под категории", () => {
  
  test("Проверка на возврат нужного количества под категорий", async () => {
    const {children: SubCategory}: Category = getCategoriesFromMockData().find(({slug}) => slug === "bytovaya-tehnika")!;
    const lenNavigationElement = SubCategory.reduce(
      (acc, {children}) => acc + children.length,0
    )
    render(
      <NextIntlClientProvider locale="en">
        <CatalogSubMenu Categories={SubCategory} />
      </NextIntlClientProvider>
    );

    expect(screen.getAllByRole("navigation-list")).toHaveLength(SubCategory.length);
    expect(screen.getAllByRole("navigation-element")).toHaveLength(lenNavigationElement);
  });

  test("Проверка на возврат правильности данных под категорий для анг", async () => {
    const {children: SubCategory}: Category = getCategoriesFromMockData().find(({slug}) => slug === "bytovaya-tehnika")!;
    render(
      <NextIntlClientProvider locale="en">
        <CatalogSubMenu Categories={SubCategory} />
      </NextIntlClientProvider>
    );

    SubCategory.forEach((Category) => {
      const nameCategory = selectDataByLangCategory(Category, "en");
      //Нет данных перевода для анг языка   
      expect(nameCategory).toBeDefined();
      if(nameCategory){
        const element = screen.getByText(nameCategory);
        //Существует ли элемент ?   
        expect(element).toBeInTheDocument();
      }
    });
  });

  test("Проверка на возврат правильности данных под категорий для каз", async () => {
    const {children: SubCategory}: Category = getCategoriesFromMockData().find(({slug}) => slug === "bytovaya-tehnika")!;
    render(
      <NextIntlClientProvider locale="kz">
        <CatalogSubMenu Categories={SubCategory} />
      </NextIntlClientProvider>
    );

    SubCategory.forEach((Category) => {
      const nameCategory = selectDataByLangCategory(Category, "kz");
      //Нет данных перевода для анг языка   
      expect(nameCategory).toBeDefined();
      if(nameCategory){
        const element = screen.getByText(nameCategory);
        //Существует ли элемент ?   
        expect(element).toBeInTheDocument();
      }
    });
  });

})