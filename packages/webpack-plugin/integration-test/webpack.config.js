const path = require('path');
const BuildStatisticsPlugin = require('../dist/index');

module.exports = {
    entry: './integration-test/dummy-app.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist-test/test'),
    },
    plugins: [new BuildStatisticsPlugin({ projectName: 'dummy-app' })],
};
