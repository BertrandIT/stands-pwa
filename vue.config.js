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
});
