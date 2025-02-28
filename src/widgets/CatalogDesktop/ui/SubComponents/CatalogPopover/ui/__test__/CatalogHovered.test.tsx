import "@/shared/mock/matchMedia.mock";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import CatalogHovered from "../CatalogHovered";
import getCategoriesFromMockData from "@/shared/mock/getCategoriesFromMockData";
import { selectDataByLangCategory } from "@/shared/tools/selectDataByLang";
import { Category } from "@/shared/types/category";
import { test, expect } from "@jest/globals";
import { describe } from "node:test";
import React from "react";

describe("CatalogHovered Проверка на правильность рендеринга и функционала", () => {
  let isHover = false;
  const setHoveredElement = ()=>{isHover=!isHover};
  const mockCategory: Category = getCategoriesFromMockData().find(
    ({ slug }) => slug === "mebel"
  )!;

  test("Рендер с выбранной локаль En", () => {
    render(
      <NextIntlClientProvider locale="en">
        <CatalogHovered
          setHoveredElement={setHoveredElement}
          Category={mockCategory}
          isHover={false}
        />
      </NextIntlClientProvider>
    );

    // Проверяем правильный рендеринг изображения
    const img = screen.getAllByRole("img")[0];
    expect(img).toBeInTheDocument();

    // Декодируем URL-адрес и проверяем наличие подстроки
    const src = decodeURIComponent(img.getAttribute("src") || "");
    expect(src).toContain(
        mockCategory.list_url_to_image[0]
    );

    const nameCategory = selectDataByLangCategory(mockCategory, "en");
    expect(nameCategory).toBeDefined();

    if (nameCategory) {
      const textElement = screen.getByText(nameCategory);
      expect(textElement).toBeInTheDocument();
    }
  });


  test('При Наведение на элемент происходит смена цвета и смена текущего элемента', async () => {
    const TestComponent = () => {
      const [hoveredElement, setHoveredElement] = React.useState<Category | null>(null);
      return (
        <NextIntlClientProvider locale="en">
          <CatalogHovered
            setHoveredElement={setHoveredElement}
            Category={mockCategory}
            isHover={hoveredElement?.id === mockCategory.id}
          />
        </NextIntlClientProvider>
      );
    };
  
    const { getByRole, rerender } = render(<TestComponent />);
  
    // Проверяем начальное состояние
    expect(getByRole('navigation-item')).toHaveStyle('color: #000000');
  
    // Симулируем наведение на элемент
    fireEvent.mouseOver(getByRole('hover-element'));
  
    // Проверяем, что цвет изменился на оранжевый
    await waitFor(() => {
      expect(getByRole('navigation-item')).toHaveStyle('color: #ffa600');
    });
  });

});