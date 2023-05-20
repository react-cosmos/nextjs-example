import * as cosmosImports from '../../../../cosmos.imports';
import { nextCosmosRenderer } from './nextCosmosRenderer';
import { nextCosmosStaticParams } from './nextCosmosStaticParams';

export const generateStaticParams = nextCosmosStaticParams(cosmosImports);

export default nextCosmosRenderer(cosmosImports);
