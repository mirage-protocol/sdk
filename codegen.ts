import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://api.testnet.aptoslabs.com/v1/graphql',
  documents: 'src/graphql/**/*.{graphql,gql}',
  generates: {
    'src/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-operations'],
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
}

export default config
