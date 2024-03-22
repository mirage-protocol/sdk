import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://api.testnet.aptoslabs.com/v1/graphql',
  documents: 'src/graphql/**/*.{graphql,gql}',
  generates: {
    'src/generated/graphql.ts': {
      plugins: [
        'typescript', // for TypeScript types
        'typescript-operations', // for operation types like queries and mutations
        'typescript-urql', // for generating urql hooks
      ],
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
}

export default config
