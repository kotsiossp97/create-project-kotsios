const path = require("path");

module.exports = {
    entry: {
        common: "./src/js/common/main.js",
        page: "./src/js/page/main.js",
        // add other js files for other pages here
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist/js"),
        publicPath: "/js/",
    },
    mode: "development",
    devServer: {
        static: "./dist",
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        // Adds CSS to the DOM by injecting a `<style>` tag
                        loader: "style-loader",
                    },
                    {
                        // Interprets `@import` and `url()` like `import/require()` and will resolve them
                        loader: "css-loader",
                    },
                    {
                        // Loader for webpack to process CSS with PostCSS
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    'autoprefixer'
                                ]
                            }
                        },
                    },
                    {
                        // Loads a SASS/SCSS file and compiles it to CSS
                        loader: "sass-loader",
                    },
                ],
            },
        ],
    },
};
