
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://graphqlzero.almansi.me/api",
  documents: "src/**/*.{tsx,ts,js,jsx,graphql,gql}",
  ignoreNoDocuments: true,
  generates: {
    "src/gql/": {
      preset: "client",
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config:{
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
      }
    }
  }
};

export default config;
