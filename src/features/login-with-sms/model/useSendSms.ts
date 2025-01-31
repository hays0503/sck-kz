"use client"

import { SetStateAction, useEffect, useState } from "react"
import { getSmsCode } from "../api";


const useSendSms = () => {
    const [smsIdentifier, setSmsIdentifier] = useState<string>();
    const [phone_number, setPhone_number] = useState<string>();
    const setPhone = (phoneNumber: string) => {
        setPhone_number(phoneNumber);
    }
    useEffect(() => {
        if(phone_number) {
            getSmsCode(phone_number).then((response: { id: SetStateAction<string | undefined>; })=>{
                if(response?.id) {
                    setSmsIdentifier(response.id);
                }
            });
        }
    },[phone_number])

    return { smsIdentifier, setPhone }
}

export default useSendSms