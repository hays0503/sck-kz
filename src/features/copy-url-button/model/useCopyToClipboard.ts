import { useState } from "react";

const useCopyToClipboard = () => {
  const [copied, setCopied] = useState(false);

  const copyCurrentUrl = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Сбрасываем состояние через 2 секунды
      })
      .catch((err) => {
        console.error("Ошибка при копировании: ", err);
      });
  };

  return { copied, copyCurrentUrl };
};

export default useCopyToClipboard;
