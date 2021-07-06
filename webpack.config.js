const path = require('path');

module.exports = {
    entry: [path.resolve('./src/MY_IMPORT.js'), path.resolve('./src/index.js')],
    devtool: false,
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        publicPath: '/dist/',
        hot: false,
        injectHot: false,
        injectClient: false,
    },
    // https://webpack.js.org/configuration/output/
    output: {
        path: path.resolve(__dirname, './dist'),
        // chunkFilename: 'chunks/[id].js',
        filename: 'my-[name].js',
        publicPath: "/dist/",
        chunkLoadingGlobal: 'modules',
        globalObject: 'window.DO_DYNAMIC_IMPORT',
        chunkLoading: 'import',
        chunkFormat: 'array-push',
        importFunctionName: 'DO_DYNAMIC_IMPORT',
    },
};