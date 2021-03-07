import { readLogs, createLogDirectoryIfItDoesntExist, writeLogs } from './helpers/file';
import { defaultOptions, PluginOptions } from './model/plugin-options';
import { BuildLog, BuildStatisticsLog } from './model/log';
import { formatDate, isLastLogFromYesterday } from './helpers/date';
import { gatherLogStatistics } from './helpers/statistics';

const BUILD_LOG_FILENAME = 'build-log';

const collectBuildStatistics = async (buildTime: number, pluginOptions: PluginOptions) => {
    if (!pluginOptions || !Reflect.has(pluginOptions, 'projectName')) {
        throw new Error("Build Statistics Plugin: projectName wasn't specified in the plugin options");
    }

    const options = Object.assign(defaultOptions, pluginOptions);

    await createLogDirectoryIfItDoesntExist(options);
    const buildLogsPath = `${options.logsDirectoryName}/${BUILD_LOG_FILENAME}`;
    let logs = await readLogs<BuildLog>(buildLogsPath);

    const lastLog = logs[logs.length - 1];
    const currentDate = new Date();

    if (lastLog && isLastLogFromYesterday(lastLog, currentDate)) {
        const summaryLogsPath = `${options.logsDirectoryName}/${options.summaryLogFilename}`;
        const summaryLogs = await readLogs<BuildStatisticsLog>(summaryLogsPath);
        const summaryLog = gatherLogStatistics(logs, options);

        summaryLogs.push(summaryLog);
        await writeLogs<BuildStatisticsLog>(summaryLogsPath, summaryLogs);

        // empties build log daily so that the file  doesn't grow
        logs = [];
    }

    logs.push(addBuildLog(currentDate, buildTime, options));
    await writeLogs<BuildLog>(buildLogsPath, logs);
};

const addBuildLog = (currentDate: Date, buildTime: number, options: PluginOptions): BuildLog => {
    return {
        date: formatDate(currentDate),
        dateISO: currentDate.toISOString(),
        timestamp: Date.now(),
        buildTime: buildTime,
        projectName: options.projectName,
    };
};

export { PluginOptions, collectBuildStatistics };
