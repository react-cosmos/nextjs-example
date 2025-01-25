import { DecoratorProps } from 'react-cosmos-core';

export default ({ children }: DecoratorProps) => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '0 24px',
      }}
    >
      {children}
    </div>
  );
};
