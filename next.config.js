const { join } = require('path');
const { parsed: myEnv } = require('dotenv').config({
    path:join(__dirname, '.env')
});
module.exports = {
    webpack: function (config, { buildId, dev, isServer, defaultLoaders, webpack }) {
        // Add support for environment variables
        config.plugins.push(new webpack.EnvironmentPlugin(myEnv));
        // Add support for SCSS
        config.module.rules.push({
            test: /\.scss$/,
            use: [
                defaultLoaders.babel,
                {
                    loader: 'sass-loader',
                    options: {
                        sassOptions: {
                            includePaths: [join(__dirname, 'styles')],
                        },
                    },
                },
            ],
        });

        //Add support for CSS
        config.module.rules.push({
            test: /\.css$/,
            include: join(__dirname, 'src'),
            use: ['style-loader', 'css-loader', 'postcss-loader'],
        });

        // Add support for fonts
        config.module.rules.push({
            test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 100000,
                        name: '[name].[ext]',
                    },
                },
            ],
        });

        // Add support for images
        if (!isServer) {
            config.module.rules.push({
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            publicPath: '/_next',
                            name: 'static/images/[hash].[ext]',
                        },
                    },
                ],
            });
        }

        // Add support for utilities
        config.resolve.alias['@utils'] = join(__dirname, 'src/utils/util/index.tsx');

        // Optimization for development mode
        if (dev) {
            // ...
        }

        return config;
    },
};