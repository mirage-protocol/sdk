import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://api.testnet.aptoslabs.com/v1/graphql',
  documents: 'src/graphql/**/*.gql',
  generates: {
    'src/generated/graphql.ts': {
      plugins: ['typescript'],
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
}

export default config
