import React, { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Category } from "@/shared/types/category";
import "@testing-library/jest-dom";
import { test, expect,describe,it,jest } from "@jest/globals";
import CatalogNavigation from "../CatalogNavigation";
import { NextIntlClientProvider } from "next-intl";
import getCategoriesFromMockData from "@/shared/mock/getCategoriesFromMockData";
import CatalogPopover from "../CatalogPopover";

const mockCategories: Category[] = getCategoriesFromMockData();

const TestComponent = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectCategory, setSelectCategory] = useState(mockCategories[6]);
    const CategoriesData = mockCategories;
    return <CatalogPopover
    params={{}} 
    isOpen={isOpen} 
    setIsOpen={setIsOpen}
    CategoriesData={CategoriesData} 
    selectCategory={selectCategory}
    setSelectCategory={setSelectCategory}>
        <span>{!isOpen?"open":"close"}</span>
    </CatalogPopover>
}

const TestComponentWithProvider = () => {
    return <NextIntlClientProvider locale="en">
        <TestComponent/>
    </NextIntlClientProvider>
}

describe("CatalogPopover component", () => {

    it("должен правильно отображать список категорий при клике", () => {

        const {rerender} = render(<TestComponentWithProvider/>);
        fireEvent.click(screen.getByText("open"));
        // Проверить что окно открылось и отобразились кнопки навигации
        expect(screen.getAllByRole("navigation-element")).toBeDefined();

    })
})