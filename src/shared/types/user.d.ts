// Получаем информацию о пользователе

export type UserInfo = {
    readonly user?: User;
    readonly emails?: Email[];
    readonly socialAccounts?: SocialAccount[];
    readonly phoneNumber?: PhoneNumber;
    readonly detail?: string;
  };
  
  export type Email = {
    readonly email?: string;
    readonly id?: string;
  };
  
  export type PhoneNumber = {
    readonly id?: string;
    readonly phoneNumber?: string;
  };
  
  export type SocialAccount = {
    readonly id?: string;
    readonly provider?: string;
    readonly providerUserID?: string;
  };
  
  export type User = {
    readonly id?: string;
    readonly first_name?: string;
    readonly last_name?: string;
    readonly active?: boolean;
  };