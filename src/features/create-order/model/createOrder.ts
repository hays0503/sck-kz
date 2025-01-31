import { createOrderApi } from "@/entities/Order";
import { IOrderCreate } from "@/shared/types/order";

const createOrder = async (Order: IOrderCreate): Promise<{status: boolean,detail: string|{detail: string},statusCode: number,statusMessage: string}> => {
    const {data,statusCode,statusMessage} = await createOrderApi(Order);
    // Запрос прошел успешно
    if(statusCode === 201){
        //Но есть ошибка базы данных или какие нибудь детали что подсказывают о не предвиденном поведение
        if(typeof(data) === "object" && Object.hasOwn(data,"detail")){
            return {status:false,detail:data,statusCode,statusMessage};
        }else{
            // Запрос прошел успешно и заказ создан успешно
            // Возвращаем ссылку на оплату
            return {status:true,detail:data,statusCode,statusMessage};
        }
    }else{
        return {status:false,detail:data,statusCode,statusMessage};
    }

}

export default createOrder