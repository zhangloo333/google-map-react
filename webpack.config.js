module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname,
        publicPatch:'/',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [{
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015','stage-2']
            },
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/
        },
        {
          test: /\.less$/,
          loader : 'style!css!less'
        }

      ],
        rules: [
            {
                test: /\.js$/,
                use: ["source-map-loader"],
                enforce: "pre"
            }
        ]
    },
    devtool: "source-map",
    devServer: {
        historyApiFallback: true,
        contentBase: './',
        port:9000
    }
};
