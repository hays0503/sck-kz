 import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {routing} from './routing';

export default getRequestConfig(async ({requestLocale}) => {
  const requested = await requestLocale;
  // Гарантируем, что locale всегда будет строкой
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale || 'ru'; // Устанавливаем 'ru' как запасной вариант

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});