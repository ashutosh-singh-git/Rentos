let config = {
    entry: './public/main.js',

    output: {
        // path:'',
        filename: 'bundle.js',
    },

    resolve: {
        extensions: ['.js', '.jsx'],
    },

    devServer: {
        historyApiFallback: true,
        inline: true,
        port: 8070
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',

                query: {
                    presets: ['es2015', 'react', 'stage-0']
                }
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader',
            },
            {
                test: /\.css$/,
                loader: ["style-loader", "css-loader"]
            }
        ]
    }
};

module.exports = config;