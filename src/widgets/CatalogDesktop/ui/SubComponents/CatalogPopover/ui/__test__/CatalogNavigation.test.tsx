import { render, screen, fireEvent } from "@testing-library/react";
import { Category } from "@/shared/types/category";
import "@testing-library/jest-dom";
import { test, expect,describe,it,jest } from "@jest/globals";
import CatalogNavigation from "../CatalogNavigation";
import { NextIntlClientProvider } from "next-intl";

// Мокаем данные категорий
const mockCategories: Category[] = [
  {
    id: 1,
    list_url_to_image: ["https://example.com/image1.png"],
    additional_data: { EN: "Category 1 EN", KZ: "Category 1 KZ" },
    name_city: "Category 1",
  },
  {
    id: 2,
    list_url_to_image: ["https://example.com/image2.png"],
    additional_data: { EN: "Category 2 EN", KZ: "Category 2 KZ" },
    name_city: "Category 2",
  },
];

// Мокаем выбранный элемент для hover
const mockHoveredElement = mockCategories[0];

const TestComponent = () => {
    return <CatalogNavigation
        params={{}}
        CategoriesData={mockCategories}
        HoveredElement={mockHoveredElement}
        setHoveredElement={jest.fn()}
        style={{}}
      />
}

const TestComponentWithProvider = (params: any) => {
    return <NextIntlClientProvider locale="en">
        <TestComponent />
    </NextIntlClientProvider>
}

describe("CatalogNavigation component", () => {
  it("должен правильно отображать список категорий", () => {
    render(<TestComponentWithProvider/>);

    // Проверяем, что рендерится два элемента
    const categoryItems = screen.getAllByRole("hover-element");
    expect(categoryItems).toHaveLength(2);
  });

});
