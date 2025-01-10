import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  generates: {
    'src/generated/aptos/graphql.ts': {
      documents: 'src/graphql/aptos_queries/*.{graphql,gql}',
      schema: 'https://api.testnet.aptoslabs.com/v1/graphql',
      plugins: [
        'typescript', // for TypeScript types
        'typescript-operations', // for operation types like queries and mutations
        'typescript-urql', // for generating urql hooks
      ],
    },
    'src/generated/mirage/graphql.ts': {
      documents: 'src/graphql/mirage_queries/*.{graphql,gql}',
      schema: 'https://api-aptos-testnet.mirage.money/v1/graphql',
      plugins: [
        'typescript', // for TypeScript types
        'typescript-operations', // for operation types like queries and mutations
        'typescript-urql', // for generating urql hooks
      ],
    },
  },
}

export default config
