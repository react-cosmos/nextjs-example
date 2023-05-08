import { NextFixtureLoader } from 'react-cosmos-next';
import { moduleWrappers, rendererConfig } from '../../../cosmos.imports';

export default ({ searchParams }: { searchParams: {} }) => {
  return (
    <NextFixtureLoader
      rendererConfig={rendererConfig}
      moduleWrappers={moduleWrappers}
      searchParams={searchParams}
    />
  );
};
