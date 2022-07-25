module.exports = (api) => {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          extensions: [
            '.ts',
            '.tsx',
            '.jsx',
            '.js',
            '.json',
          ],
          alias: {
            '@db': './src/db',
            '@components': './src/components',
            '@navigators': './src/navigators',
            '@styles': './src/styles',
            '@store': './src/store',
          },
        },
      ],
    ],
  };
};
