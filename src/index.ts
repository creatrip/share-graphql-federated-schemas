import * as fs from 'fs';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchema } from '@graphql-tools/load';
import { mergeSchemas } from '@graphql-tools/schema';
import { printSubgraphSchema } from '@apollo/subgraph';

async function main() {
  const base = await loadSchema('base.graphql', {
    loaders: [new GraphQLFileLoader()],
  });

  const changed = await loadSchema('changed.graphql', {
    loaders: [new GraphQLFileLoader()],
  });

  const gatewaySchema = mergeSchemas({ schemas: [base, changed] });
  fs.writeFileSync('schema.graphql', printSubgraphSchema(gatewaySchema));
}

main();
