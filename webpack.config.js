const path = require('path');

module.exports = {
    entry: './src/js/App.js',
    mode: 'development',
    output: {
        path: `${__dirname}/dist/js`,
        filename: 'scripts.js'
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist')
        },
        compress: true,
        port: 9000,
        liveReload: true
    }
};
