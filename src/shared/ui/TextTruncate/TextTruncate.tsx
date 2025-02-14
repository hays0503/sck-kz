"use client";

import { Flex, Typography } from 'antd';
import { useState } from 'react';

const {  Text } = Typography;

const TextTruncate: React.FC<{ text: string, style?: React.CSSProperties }> = ({ text, style }) => {

  const [ellipsis, setEllipsis] = useState(true);

  const styleText = {
    
    ...style, 
    ellipsis: ellipsis ? { width: 200 } : undefined,
  }

  return (
    <Flex style={{ width: "100%" }}>
    <Text
        onClick={() => setEllipsis(!ellipsis)}
        style={styleText}
        ellipsis={ellipsis ? { tooltip: text } : false}
    >
      {text}
    </Text>
    </Flex>
  );
};

export default TextTruncate;
