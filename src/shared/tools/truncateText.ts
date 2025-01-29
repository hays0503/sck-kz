// Функция для обрезки текста в зависимости от флага и настроек
function truncateText(text: string, localActive: string, showFullText: boolean): string {
    // Сегментатор для разделения на предложения
    const segmenter = new Intl.Segmenter(localActive, { granularity: 'sentence' });
  
    // Если флаг true, возвращаем весь текст
    if (showFullText) {
      return text;
    }
  
    // Преобразуем итератор сегментов в массив предложений
    const sentences = Array.from(segmenter.segment(text));
  
    // Составляем текст из первых 3 предложений
    let truncatedText = '';
    for (const { segment } of sentences.slice(0, 3)) {
      // Проверяем, не превысит ли текст 255 символов
      if ((truncatedText + segment).length > 255) break;
      truncatedText += segment;
    }
  
    // Возвращаем обрезанный текст
    return truncatedText.slice(0, 255); // Обрезаем, если последний сегмент превысил 255
  }
export default truncateText;