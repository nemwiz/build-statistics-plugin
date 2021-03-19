const path = require('path');
const BuildStatisticsPlugin = require('../../dist/index');

module.exports = {
    entry: './dummy-app.js',
    mode: 'production',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist-test'),
    },
    plugins: [new BuildStatisticsPlugin({ projectName: 'dummy-app' })],
};
