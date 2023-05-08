'use client';
import { Tweet } from 'react-tweet';
import { useSelect } from 'react-cosmos-renderer/client';

export default () => {
  const [id] = useSelect('Tweet ID', {
    options: [
      '599960326621286401',
      '831457430840176640',
      '911347634069168128',
      '1093138486587199488',
      '1139838627976843264',
      '1156147491026472964',
      '1206892066179039232',
      '1341072021099327489',
      '1528839321070993409',
      '1636441676506906626',
      '1654156302531063812',
    ],
  });
  return <Tweet id={id} />;
};
