import { RendererConfig, UserModuleWrappers } from 'react-cosmos-core';
import { NextFixtureLoader } from './NextFixtureLoader';
import { CosmosPageParams } from './nextShared';

type NextCosmosRendererArgs = {
  rendererConfig: RendererConfig;
  moduleWrappers: UserModuleWrappers;
};

type NextCosmosRendererProps = {
  params: CosmosPageParams;
};

export function nextCosmosRenderer({
  rendererConfig,
  moduleWrappers,
}: NextCosmosRendererArgs) {
  return function NextCosmosRenderer({ params }: NextCosmosRendererProps) {
    return (
      <NextFixtureLoader
        rendererConfig={rendererConfig}
        moduleWrappers={moduleWrappers}
        params={params}
      />
    );
  };
}
