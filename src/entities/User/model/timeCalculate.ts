

// Вы числить разницу часовых поясов сервера и клиента.
// На основании предположение что сервер создал токен недавно
const timeCalculate = (ExpiresDate:Date) => {

    const serverTimezoneOffsetMinutes = new Date().getTimezoneOffset();
    // console.log("serverTimezoneOffsetMinutes =>",serverTimezoneOffsetMinutes);
    const nowDateUTC0 = new Date(Date.now()).getTime() + serverTimezoneOffsetMinutes*60*1000;
    // console.log("nowDateUTC0 =>",new Date(nowDateUTC0));
    const expiresDateUTC0 = new Date(ExpiresDate).getTime();
    // console.log("expiresDateUTC0 =>",new Date(expiresDateUTC0));

    const diff = expiresDateUTC0 - nowDateUTC0;
    if(diff < 0){
        console.log("Токен устарел");
        console.log("Устарел на секунд =>",Math.abs((diff)/1000));
        return true
    }else{
        console.log("Токен не устарел");
        console.log("Время до устаревания секунд =>",(diff)/1000);
        return false
    }
}

export default timeCalculate