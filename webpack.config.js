const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HandlebarsPlugin = require('handlebars-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    entry: './src/js/App.js',
    mode: 'development',
    output: {
        path: `${__dirname}/dist/`,
        filename: 'js/scripts.js'
    },
    watch: true,
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        new HandlebarsPlugin({
            // path to hbs entry file(s). Also supports nested directories if write path.join(process.cwd(), "app", "src", "**", "*.hbs"),
            entry: path.join(process.cwd(), 'src', 'html', '*.hbs'),
            // output path and filename(s). This should lie within the webpacks output-folder
            // if ommited, the input filepath stripped of its extension will be used
            output: path.join(process.cwd(), 'dist', '[name].html'),
            // you can also add a [path] variable, which will emit the files with their relative path, like
            // output: path.join(process.cwd(), "build", [path], "[name].html"),
            partials: [path.join(process.cwd(), 'src', 'html', 'components', '*.hbs')]
        }),
        new BrowserSyncPlugin(
            // BrowserSync options
            {
                // browse to http://localhost:3000/ during development
                host: 'localhost',
                port: 3000,
                // proxy the Webpack Dev Server endpoint
                // (which should be serving on http://localhost:3100/)
                // through BrowserSync
                proxy: 'http://localhost:9000/',
                files: ['./dist/*.html', './dist/css/*.css', './distjs/*.js']
            },
            // plugin options
            {
                // prevent BrowserSync from reloading the page
                // and let Webpack Dev Server take care of this
                reload: false
            }
        )
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(svg|gif|png|eot|woff|ttf)$/,
                use: ['url-loader']
            }
        ]
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
