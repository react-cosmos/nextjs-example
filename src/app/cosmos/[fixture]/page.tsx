import { Base64 } from 'js-base64';
import { FixtureId } from 'react-cosmos-core';
import { ServerFixtureLoader } from 'react-cosmos-renderer';
import { isElement } from 'react-is';
import { moduleWrappers, rendererConfig } from '../../../../cosmos.imports';
import { NextRendererProvider } from './NextFixtureProvider';

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
          fixture: encodeFixtureId({
            path: fixturePath,
            name: fixtureName,
          }),
        });
      }
    } else {
      params.push({
        fixture: encodeFixtureId({ path: fixturePath }),
      });
    }
  }

  return params;
}

function encodeFixtureId(fixtureId: FixtureId) {
  return Base64.encode(JSON.stringify(fixtureId));
}

export default ({ params }: { params: PageParams }) => {
  const fixtureId =
    params.fixture && params.fixture !== 'index'
      ? JSON.parse(Base64.decode(decodeURIComponent(params.fixture)))
      : null;

  return (
    <NextRendererProvider
      rendererConfig={rendererConfig}
      searchParams={{
        fixtureId: fixtureId && JSON.stringify(fixtureId),
      }}
    >
      <ServerFixtureLoader
        params={{
          fixtureId,
        }}
        moduleWrappers={moduleWrappers}
        renderMessage={renderMessage}
      />
    </NextRendererProvider>
  );
};

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
