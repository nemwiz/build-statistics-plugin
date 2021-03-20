const buildStatistics = require('../dist/index');

export default {
    input: `./integration-test/dummy-app.js`,
    output: {
        file: `dist-test/index.js`,
        format: 'cjs',
    },
    plugins: [
        buildStatistics({
            projectName: 'dummy-app',
        }),
    ],
};
