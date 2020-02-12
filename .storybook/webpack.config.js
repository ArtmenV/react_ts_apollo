const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path')

module.exports = ({ config }) => {
  const createCompiler = require('@storybook/addon-docs/mdx-compiler-plugin');
  // use installed babel-loader which is v8.0-beta (which is meant to work with @babel/core@7)
  config.module.rules[0].use[0].loader = require.resolve('babel-loader');

  config.module.rules.push(
    {
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve("babel-loader"),
        options: {
          presets: [
            require("@babel/preset-typescript").default,
            require("@babel/preset-react").default
          ]
        }
      },
      require.resolve("react-docgen-typescript-loader")
    ],
  },
  {
    test: /\.stories\.tsx?$/,
    loaders: [
      {
        loader: require.resolve('@storybook/source-loader'),
        options: { parser: 'typescript' },
      },
    ],
    enforce: 'pre',
  },
  {
    test: /\.stories\.mdx$/,
    // exclude: [/node_modules/],
    // include: [
    //     path.resolve(__dirname, '../src/ui'),
    // ],
    use: [
      {
        loader: 'babel-loader',
        options: {
          plugins: ['@babel/plugin-transform-react-jsx']
        }
      },
      {
        loader: '@mdx-js/loader',
        options: {
          compilers: [createCompiler({})]
        }
      }
    ],
  },
  );
  // config.module.rules.push( {
  //   test: /\.stories\.mdx$/,
  //   exclude: [/node_modules/],
  //   loaders: [
  //     {
  //       loader: require.resolve('@mdx-js/loader'),
  //       options: {
  //         compilers: [createCompiler({})]
  //       }
  //     }
  //   ],
  //   enforce: 'pre',
  // },);

  config.resolve.extensions.push('.ts', '.tsx', '.mdx');
  config.resolve.plugins=[new TsconfigPathsPlugin({ configFile: "./tsconfig.json"  })]
  return config;
};