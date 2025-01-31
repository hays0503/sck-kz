export interface TOrder {
    account_number: number
    delivery_address: string
    payment_type: string
    delivery_type: string
    uuid_id: string
    order_status: string
    comment: string
    user_id: string
    phone_number: string
    id: number
    user_full_name: string
    email: string
    created_at: string
    total_amount: number
    shipping_city: string
    updated_at: string
    manager_executive: string|number|null|undefined // Хуй знает
    manager_executive_id: string|number|null|undefined // Хуй знает
    manager_mailbox: string|number|null|undefined // Хуй знает
  }
