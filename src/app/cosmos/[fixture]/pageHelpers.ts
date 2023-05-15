import { Base64 } from 'js-base64';
import { FixtureId } from 'react-cosmos-core';

export type PageParams = {
  fixture: string | null;
};

export function getFixtureIdFromPageParams(
  params: PageParams
): FixtureId | null {
  return params.fixture && params.fixture !== 'index'
    ? JSON.parse(Base64.decode(decodeURIComponent(params.fixture)))
    : null;
}

export function getFixturePageUrl(
  basePath: string,
  fixtureId: FixtureId
): string {
  return `/${basePath}/${Base64.encode(JSON.stringify(fixtureId))}`;
}
