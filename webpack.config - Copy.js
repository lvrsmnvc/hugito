module.exports = {
    entry: './index.js',
    output: {
        path: './public',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node-modules/
            }, {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
            , {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            }, {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    }
}
