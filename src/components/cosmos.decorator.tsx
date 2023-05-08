import { ReactDecoratorProps } from 'react-cosmos-core';

export default ({ children }: ReactDecoratorProps) => {
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
