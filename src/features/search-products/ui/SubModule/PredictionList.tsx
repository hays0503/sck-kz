import { FC } from 'react';
import { Tag } from 'antd';
import { MdOutlineSearch } from 'react-icons/md';

interface PredictionListProps {
  predictions: string[];
  setText: (text: string) => void;
}

const PredictionList: FC<PredictionListProps> = ({ predictions, setText }) => (
  <>
    {predictions.map((prediction) => (
      <Tag
        bordered={false}
        style={{
          padding: '5px 20px',
          cursor: 'pointer',
          borderRadius: '20px',
          backgroundColor: '#dfdfdf',
          fontSize: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
        }}
        key={prediction}
        onClick={() => setText(prediction)}
      >
        <MdOutlineSearch />
        {prediction}
      </Tag>
    ))}
  </>
);

export default PredictionList;