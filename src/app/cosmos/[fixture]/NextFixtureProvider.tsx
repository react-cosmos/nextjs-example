'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { FixtureId, RendererConfig } from 'react-cosmos-core';
import {
  GlobalErrorHandler,
  reloadDomRenderer,
  useDomRendererConnect,
  useDomRendererId,
} from 'react-cosmos-dom';
import {
  RendererProvider,
  SelectedFixture,
} from 'react-cosmos-renderer/client';
import { getFixturePageUrl } from './pageHelpers';

type Props = {
  children: React.ReactNode;
  rendererConfig: RendererConfig;
  selectedFixture: SelectedFixture | null;
};
export function NextRendererProvider({
  children,
  rendererConfig,
  selectedFixture,
}: Props) {
  const rendererId = useDomRendererId();
  const rendererConnect = useDomRendererConnect(rendererConfig);

  const pathname = usePathname();
  const router = useRouter();

  const searchParams = useSearchParams();
  const locked = searchParams.get('locked') === 'true';

  const [, baseUrl] = pathname.match(/^\/(.+?)\//)!;

  const selectFixture = React.useCallback(
    (fixtureId: FixtureId) => {
      router.push(getFixturePageUrl(baseUrl, fixtureId));
    },
    [baseUrl, router]
  );

  const unselectFixture = React.useCallback(() => {
    router.push(`/${baseUrl}/index`);
  }, [baseUrl, router]);

  return (
    <RendererProvider
      rendererId={rendererId}
      rendererConnect={rendererConnect}
      locked={locked}
      selectedFixture={selectedFixture}
      selectFixture={selectFixture}
      unselectFixture={unselectFixture}
      reloadRenderer={reloadDomRenderer}
    >
      {children}
      {typeof window !== 'undefined' && <GlobalErrorHandler />}
    </RendererProvider>
  );
}
