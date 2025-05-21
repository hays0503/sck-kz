import { FC } from 'react';
import { Flex } from 'antd';
import PredictionList from './PredictionList';

interface PredictionMenuProps {
  predictionsLists: string[][];
  inputText: string;
  setText: (text: string) => void;
}

const PredictionMenu: FC<PredictionMenuProps> = ({ predictionsLists, setText, inputText }) => {
  const flat: string[] = predictionsLists.flat().filter((item) => item !== inputText);
  if (flat.length === 0) return null;

  return (
    <Flex
      wrap
      gap={5}
      style={{ width: '100%', padding: '10px', backgroundColor: '#f4f4f4' }}
    >
      <PredictionList predictions={flat} setText={setText} />
    </Flex>
  );
};

export default PredictionMenu;