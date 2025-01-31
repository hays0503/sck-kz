export interface UserInfo {
    user: PersonalData
    emails: Email[]
    social_accounts: SocialAccount[]
    phone_number: PhoneNumber | null
  }
  
  export interface PersonalData {
    id: string
    first_name: string | null
    last_name: string | null
    active: boolean | null
  }
  
  export interface Email {
    email: string
    id: string
  }
  
  export interface SocialAccount {
    id: string
    provider: string
    provider_user_id: string
  }
  
  export interface PhoneNumber {
    id: string | null
    phone_number: string | null
  }
  