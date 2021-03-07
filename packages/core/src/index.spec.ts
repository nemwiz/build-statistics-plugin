import { collectBuildStatistics } from './index';
import * as fileHelpers from './helpers/file';
import { BuildLog } from './model/log';

describe('build statistics plugin', () => {
    const pluginOptions = {
        projectName: 'stats-plugin-test',
        logsDirectoryName: 'a',
        summaryLogFilename: 'summary',
    };

    it('throws an error when plugins options are not specified or some options are missing', async () => {
        await expect(collectBuildStatistics(0, undefined)).rejects.toThrow();
        await expect(collectBuildStatistics(0, { someProperty: 123 } as any)).rejects.toThrow();
    });
    it('writes a build log every time webpack or rollup runs', async () => {
        const dummyLogs = [
            {
                date: '1-1-2021',
                buildTime: 3000,
            },
            {
                date: '1-1-2021',
                buildTime: 4500,
            },
        ] as BuildLog[];

        jest.useFakeTimers('modern').setSystemTime(new Date(2021, 0, 1).getTime());

        spyOn(fileHelpers, 'createLogDirectoryIfItDoesntExist').and.returnValue(Promise.resolve());
        spyOn(fileHelpers, 'readLogs').and.returnValue(Promise.resolve(dummyLogs));

        const writeLogSpy = spyOn(fileHelpers, 'writeLogs').and.returnValue(Promise.resolve());
        const buildTime = 1000;

        await collectBuildStatistics(buildTime, pluginOptions);

        const spyArgs = writeLogSpy.calls.argsFor(0);
        expect(writeLogSpy).toHaveBeenCalledTimes(1);

        expect(spyArgs[0]).toEqual(`${pluginOptions.logsDirectoryName}/build-log`);
        expect(spyArgs[1].length).toEqual(3);
        expect(
            spyArgs[1].filter(
                (log: BuildLog) => log.buildTime === buildTime && log.projectName === pluginOptions.projectName
            ).length
        ).toEqual(1);
    });
    it('creates a summary log of all builds from the previous day and empties the build log', async () => {
        const dummyBuildLogs = [
            {
                date: '1-1-2021',
                buildTime: 3000,
            },
            {
                date: '1-1-2021',
                buildTime: 4500,
            },
        ] as BuildLog[];

        const dummySummaryLogs = [
            {
                projectName: pluginOptions.projectName,
                date: '1-1-2021',
                totalBuildTime: 5000,
                buildsCount: 3,
                meanBuildTime: 2500,
                medianBuildTime: 2000,
                slowestBuildTime: 1000,
                fastestBuildTime: 3000,
            },
        ];

        jest.useFakeTimers('modern').setSystemTime(new Date(2021, 0, 2).getTime());

        spyOn(fileHelpers, 'createLogDirectoryIfItDoesntExist').and.returnValue(Promise.resolve());
        spyOn(fileHelpers, 'readLogs').and.callFake((params) => {
            return params.indexOf('summary') !== -1 ? dummySummaryLogs : dummyBuildLogs;
        });

        const writeLogSpy = spyOn(fileHelpers, 'writeLogs').and.returnValue(Promise.resolve());
        const buildTime = 1000;

        await collectBuildStatistics(buildTime, pluginOptions);

        const spyArgsFirstCall = writeLogSpy.calls.argsFor(0);
        const spyArgsSecondCall = writeLogSpy.calls.argsFor(1);

        expect(writeLogSpy).toHaveBeenCalledTimes(2);

        expect(spyArgsFirstCall[0]).toEqual(`${pluginOptions.logsDirectoryName}/${pluginOptions.summaryLogFilename}`);
        expect(spyArgsFirstCall[1].length).toEqual(2);

        expect(spyArgsSecondCall[0]).toEqual(`${pluginOptions.logsDirectoryName}/build-log`);
        expect(spyArgsSecondCall[1].length).toEqual(1);
        expect(
            spyArgsSecondCall[1].filter(
                (log: BuildLog) => log.buildTime === buildTime && log.projectName === pluginOptions.projectName
            ).length
        ).toEqual(1);
    });
});
