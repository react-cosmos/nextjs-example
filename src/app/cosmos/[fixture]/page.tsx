import { encodeRendererUrlFixture } from 'react-cosmos-core';
import { isElement } from 'react-is';
import { moduleWrappers, rendererConfig } from '../../../../cosmos.imports';
import { nextCosmosRenderer } from './nextCosmosRenderer';
import { CosmosPageParams } from './nextShared';

export function generateStaticParams() {
  if (moduleWrappers.lazy) {
    throw new Error('Lazy mode not support yet in Next.js exports — Sorry!');
  }

  const params: CosmosPageParams[] = [{ fixture: 'index' }];

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

export default nextCosmosRenderer({ moduleWrappers, rendererConfig });
