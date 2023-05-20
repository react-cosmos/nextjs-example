import { Suspense } from 'react';
import {
  FixtureId,
  decodeRendererUrlFixture,
  encodeRendererUrlFixture,
} from 'react-cosmos-core';
import { ServerFixtureLoader } from 'react-cosmos-renderer';
import { isElement } from 'react-is';
import { moduleWrappers, rendererConfig } from '../../../../cosmos.imports';
import { NextRendererProvider } from './NextRendererProvider';

type PageParams = {
  fixture: string | null;
};

export function generateStaticParams() {
  if (moduleWrappers.lazy) {
    throw new Error('Lazy mode not support yet in Next.js exports — Sorry!');
  }

  const params: PageParams[] = [{ fixture: 'index' }];

  for (const fixturePath in moduleWrappers.fixtures) {
    const { module } = moduleWrappers.fixtures[fixturePath];
    // We won't be able to "open" Client fixtures, but that's fine because we
    // know they are all single component fixtures.
    if (
      module.default &&
      typeof module.default === 'object' &&
      !isElement(module.default)
    ) {
      for (const fixtureName in module.default) {
        params.push({
          fixture: encodeRendererUrlFixture({
            path: fixturePath,
            name: fixtureName,
          }),
        });
      }
    } else {
      params.push({
        fixture: encodeRendererUrlFixture({ path: fixturePath }),
      });
    }
  }

  return params;
}

export default async ({ params }: { params: PageParams }) => {
  const fixtureId = getFixtureIdFromPageParams(params);

  const selectedFixture = fixtureId && {
    fixtureId,
    initialFixtureState: {},
    // This fixture loader is meant to work with Next.js build-time static
    // generation. Its props will be driven by finite URL segment params and not
    // query strings, which are inherently dynamic. This means we can't receive
    // an incrementing renderKey here. Instead, we'll rely solely on the fixture
    // ID as the fixture render key and will not support refreshing the current
    // fixture by selecting it again.
    renderKey: 0,
  };

  return (
    <Suspense>
      <NextRendererProvider
        rendererConfig={rendererConfig}
        selectedFixture={selectedFixture}
      >
        <ServerFixtureLoader
          moduleWrappers={moduleWrappers}
          renderMessage={renderMessage}
          selectedFixture={selectedFixture}
        />
      </NextRendererProvider>
    </Suspense>
  );
};

function getFixtureIdFromPageParams(params: PageParams): FixtureId | null {
  return params.fixture && params.fixture !== 'index'
    ? decodeRendererUrlFixture(decodeURIComponent(params.fixture))
    : null;
}

const containerStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, Ubuntu, "Helvetica Neue", Helvetica, sans-serif',
  fontSize: 14,
};

function renderMessage(msg: string) {
  return <div style={containerStyle}>{msg}</div>;
}
