

//Создание заказа
export interface IOrderCreate {
    readonly user_full_name: string | null;                                //ФИО
    readonly payment_type: "OFFLINE" | "ONLINE"| null;                    //Тип оплаты
    readonly uuid_id: string | null                                        //Идентификатор заказа 
    readonly phone_number: string | null;                                  //Номер телефона
    readonly shipping_city: string | null;                                 //Город доставки заказа
    readonly delivery_address: string | null;                       //Адрес доставки
    readonly delivery_type: "DELIVERY" | "PICKUP" | null;                  //Тип доставки
    readonly access_token: { readonly access_token: string };       //Token для подписания заказа
    readonly email: string | null;                                         //Email
    readonly comment: string | null;                                //Комментарий к заказу
}

//Информация о заказе
export interface IOrderHistory extends IOrderCreate {
    readonly order_status: "NEW" | "INWORK" | "COMPLITED";      //Статус заказа
    readonly manager_executive: string | null;                  //Менежер, принявщий заявку.
    readonly manager_executive_id: string | null;               //ИД менеджера, принявщего заявку.
    readonly manager_mailbox: string | null;                    //Почтовый ящик менеджера.    
}