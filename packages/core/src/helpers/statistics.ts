import { BuildLog, BuildStatisticsLog } from '../model/log';
import { PluginOptions } from '../model/plugin-options';

export const gatherLogStatistics = (logs: BuildLog[], options: PluginOptions): BuildStatisticsLog => {
    const logsTime = logs.map((log) => log.buildTime).sort();
    const totalTime = logsTime.reduce((totalBuildTime: number, currentLog: number) => {
        return totalBuildTime + currentLog;
    }, 0);
    const meanTime = Math.floor(totalTime / logsTime.length);
    const medianTime = calculateMedian(logsTime);

    return {
        projectName: options.projectName,
        date: logs[0].date,
        totalBuildTime: totalTime,
        buildsCount: logsTime.length,
        meanBuildTime: meanTime,
        medianBuildTime: medianTime,
        slowestBuildTime: logsTime[0],
        fastestBuildTime: logsTime[logsTime.length - 1],
    };
};

const calculateMedian = (logs: number[]): number => {
    if (logs.length % 2 === 0) {
        const middleIndex = logs.length / 2;
        return Math.floor((logs[middleIndex] + logs[middleIndex - 1]) / 2);
    } else {
        return logs[Math.floor(logs.length / 2)];
    }
};
