// Получаем информацию о пользователе

export type UserInfo = {
  readonly id: string;
  readonly username: string;
  readonly avatar_path: string;
  readonly email: string | null;
  readonly last_login: string | null; // Можно использовать Date, если потребуется
  readonly external_id: string | null;
  readonly phone: Phone | null;
  readonly social_accounts: SocialAccount[];
  readonly addresses: Address[];
  readonly wishlist_items: WishlistItem[];
  readonly vieved_products: ViewedProduct[];
};

export type Phone = {
  readonly phone_number: string;
};

export type SocialAccount = {
  readonly id: string;
  readonly provider: string;
  readonly providerUserID: string;
};

// Если подробности по адресам, товарам в вишлисте и просмотренным продуктам отсутствуют,
// можно определить их как пустые объекты или заменить на подходящие типы
export type Address = Record<string, unknown>;
export type WishlistItem = Record<string, unknown>;
export type ViewedProduct = Record<string, unknown>;