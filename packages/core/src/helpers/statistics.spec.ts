import { BuildLog } from '../model/log';
import { gatherLogStatistics } from './statistics';

describe('log statistics', () => {
    const options = {
        projectName: 'test-project',
    };

    const dummyLogs = [
        {
            date: '1-1-2021',
            buildTime: 3000,
        },
        {
            date: '1-1-2021',
            buildTime: 6000,
        },
        {
            date: '1-1-2021',
            buildTime: 4500,
        },
    ] as BuildLog[];

    it('calculates total build time', () => {
        const summaryLog = gatherLogStatistics(dummyLogs, options);

        expect(summaryLog.totalBuildTime).toEqual(13500);
    });
    it('counts the build', () => {
        const summaryLog = gatherLogStatistics(dummyLogs, options);

        expect(summaryLog.buildsCount).toEqual(dummyLogs.length);
    });
    it('calculates average build time', () => {
        const summaryLog = gatherLogStatistics(dummyLogs, options);

        expect(summaryLog.meanBuildTime).toEqual(4500);
    });
    it('calculates median build time', () => {
        let summaryLog = gatherLogStatistics(dummyLogs, options);

        expect(summaryLog.medianBuildTime).toEqual(4500);

        const newDummyLogs = dummyLogs.concat([{ date: '1-1-2021', buildTime: 4000 } as BuildLog]);

        summaryLog = gatherLogStatistics(newDummyLogs, options);

        expect(summaryLog.medianBuildTime).toEqual(4250);
    });
    it('calculates slowest and fastest build time', () => {
        const summaryLog = gatherLogStatistics(dummyLogs, options);

        expect(summaryLog.slowestBuildTime).toEqual(3000);
        expect(summaryLog.fastestBuildTime).toEqual(6000);
    });
});
