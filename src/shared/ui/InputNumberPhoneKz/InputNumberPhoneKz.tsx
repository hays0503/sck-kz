"use client";
import { Flex, Input, Typography } from "antd";
import { useTranslations } from "next-intl";
import Image from "next/image";
import {  useState } from "react";

const { Text } = Typography;
export default function InputNumberPhoneKz({ numberString, setNumberString }: { numberString: string, setNumberString: (value: string) => void }) {
  const t = useTranslations("InputNumberPhoneKz");
  const [showPaste, setShowPaste] = useState(false);

  const checkClipboard = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          setShowPaste(true);
        }
        // setClipboardContent(text || 'Буфер обмена пуст');
      } else {
        // setClipboardContent('Ваш браузер не поддерживает чтение из буфера обмена');
      }
    } catch (err) {
      // setClipboardContent('Ошибка при доступе к буферу обмена');
      console.error(err);
    }
  };

  // useEffect(() => {
  //   setInterval(() => {
  //     checkClipboard();
  //   }, 1000);
  // }, []);


  const setAction = (value: string) => {
    const number = value.replace(/\D/g, "");
    switch (number.length) {
      case 0:
        setNumberString(`(${number}`);
        break;
      case 1:
        setNumberString(`(${number}`);
        break;
      case 2:
        setNumberString(`(${number}`);
        break;
      case 3:
        setNumberString(`(${number}`);
        break;
      case 4:
        setNumberString(
          `(${number.slice(0, 3)}) ${number.slice(3, 6)}`
        );
        break;
      case 5:
        setNumberString(
          `(${number.slice(0, 3)}) ${number.slice(3, 6)}`
        );
        break;
      case 6:
        setNumberString(
          `(${number.slice(0, 3)}) ${number.slice(3, 6)}`
        );
        break;
      default:
        setNumberString(
          `(${number.slice(0, 3)}) ${number.slice(
            3,
            6
          )} - ${number.slice(6, 10)}`
        );
    }
  }

  const actionPaste = (text: string) => {


    // Убираем все лишние символы и оставляем только цифры
    const digitsOnly = text.replace(/\D/g, '');

    let normalizedNumber = '';

    // Проверяем, начинается ли номер с +7 или 8
    if (digitsOnly.startsWith('7') && digitsOnly.length === 11) {
      // Если номер начинается с 7 (после +), заменяем +7 на 8
      normalizedNumber = digitsOnly.slice(1);
      setAction(normalizedNumber);
    } else if (digitsOnly.startsWith('8') && digitsOnly.length === 11) {
      // Если номер уже начинается с 8, оставляем как есть
      normalizedNumber = digitsOnly.slice(1);
      setAction(normalizedNumber);
    } else {
      // Если номер некорректный, можно вывести ошибку или игнорировать
      console.warn('Некорректный номер телефона:', text);
      return;
    }

    // Передаем нормализованный номер в нужную функцию
    console.log('Нормализованный номер:', normalizedNumber);
    // setAction(normalizedNumber);
  };

  const actionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAction(e.target.value);
  }

  const OnPasteComponent = () => <>{showPaste && <Flex align="center" justify="center" style={{ cursor: 'pointer' }}
    onClick={() => navigator.clipboard.readText().then(text => actionPaste(text))}>
    <Text style={{ fontSize: '10px' }}>
      {t('vstavit iz buffera')}
    </Text>
    <Image width={24} height={24} src="/paste.svg" alt="paste" />
  </Flex>}</>


  return <Input
    autoFocus={true}
    type="tel"
    addonBefore="+7"
    value={numberString}
    placeholder={t('vash-telefon')}
    size="large"
    onClick={checkClipboard}
    onPaste={e => actionPaste(e.clipboardData.getData("Text"))}
    onChange={e => actionChange(e)}
    pattern="\(\d{3}\) \d{3} - \d{4}"
    suffix={<OnPasteComponent />}
  />
}
