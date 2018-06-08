module.exports = {
    entry: "./main.js",
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            },{
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
        ]
    },
    output: {
        filename: "bundle.js"
    }
}
