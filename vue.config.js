const { DefinePlugin } = require('webpack');
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: 'http://192.168.1.100',
    // port: 7000,
    // headers: { 'Access-Control-Allow-Origin': '*' },
  },
  chainWebpack: (config) => {
    config.plugin('define').tap((definitions) => {
      definitions[0]['process.env']['VUE_APP_NON_SAFE_OPERATIONS_ENDPOINT_ADDRESS'] = JSON.stringify(
        process.env.VUE_APP_NON_SAFE_OPERATIONS_ENDPOINT_ADDRESS
      );
      definitions[0]['process.env']['VUE_APP_SAFE_OPERATIONS_ENDPOINT_ADDRESS'] = JSON.stringify(
        process.env.VUE_APP_SAFE_OPERATIONS_ENDPOINT_ADDRESS
      );
      return definitions;
    });
  },
});