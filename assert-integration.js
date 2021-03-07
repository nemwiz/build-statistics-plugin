// loads the plugin in Rollup and Webpack, runs the build tools and assert that everything works

const fs = require('fs');
const { execSync } = require('child_process');

const runIntegrationTest = (pluginInfo) => {
    execSync(`lerna run test --stream --scope ${pluginInfo.packageName}`);
    execSync(`lerna run test --stream --scope ${pluginInfo.packageName}`);

    if (!fs.existsSync(`packages/${pluginInfo.directoryName}/stats/build-log.json`)) {
        throw new Error('Build log file was not found.');
    }

    const logFileContent = fs.readFileSync(`packages/${pluginInfo.directoryName}/stats/build-log.json`);
    const logs = JSON.parse(logFileContent.toString());

    if (logs.length !== 2) {
        throw new Error('Build log file was empty or not correctly written');
    }

    const newLogs = logs.map((log) => Object.assign(log, { date: '0-0-2000' }));

    fs.writeFileSync(`packages/${pluginInfo.directoryName}/stats/build-log.json`, JSON.stringify(newLogs));

    execSync(`lerna run test --stream --scope ${pluginInfo.packageName}`);

    const summaryLogsContent = fs.readFileSync(`packages/${pluginInfo.directoryName}/stats/build-stats-summary.json`);
    const summaryLogs = JSON.parse(summaryLogsContent.toString());

    if (summaryLogs.length !== 1) {
        throw new Error('Summary log file was empty or not correctly written');
    }
};

const webpack = {
    packageName: 'webpack-plugin-build-statistics',
    directoryName: 'webpack-plugin',
};

const rollup = {
    packageName: 'rollup-plugin-build-statistics',
    directoryName: 'rollup-plugin',
};

runIntegrationTest(webpack);
runIntegrationTest(rollup);
