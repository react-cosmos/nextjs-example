'use client';
import { Base64 } from 'js-base64';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { RendererConfig, RendererSearchParams } from 'react-cosmos-core';
import { DomRendererProvider } from 'react-cosmos-dom';

type Props = {
  children: React.ReactNode;
  rendererConfig: RendererConfig;
  searchParams: RendererSearchParams;
};
export function NextRendererProvider({
  children,
  rendererConfig,
  searchParams,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const setSearchParams = React.useCallback(
    (nextParams: RendererSearchParams) => {
      const fixtureId = nextParams.fixtureId;

      const match = pathname.match(/^\/(.+?)\//);
      if (match) {
        if (!fixtureId) {
          router.push(`/${match[1]}/index`);
        } else {
          router.push(`/${match[1]}/${escapePath(Base64.encode(fixtureId))}`);
        }
      }
    },
    [pathname, router]
  );

  function escapePath(filePath: string) {
    return filePath.replace(/\./g, '{{dot}}');
  }

  return (
    <DomRendererProvider
      rendererConfig={rendererConfig}
      searchParams={searchParams}
      setSearchParams={setSearchParams}
    >
      {children}
    </DomRendererProvider>
  );
}
