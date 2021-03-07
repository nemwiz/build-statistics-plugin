import { formatDate, isLastLogFromYesterday } from './date';
import { BuildLog } from '../model/log';

describe('date helper functions', () => {
    it('formats a date in a specific format', () => {
        const expectedDate = '3-11-2021';
        const date = new Date(2021, 10, 3);

        expect(formatDate(date)).toEqual(expectedDate);
    });
    it('returns true if the last log is from yesterday', () => {
        const lastLog = { date: '2-11-2021' } as BuildLog;
        const date = new Date(2021, 10, 3);

        expect(isLastLogFromYesterday(lastLog, date)).toEqual(true);
    });
    it('returns false if the last log is not from yesterday', () => {
        const lastLog = { date: '3-11-2021' } as BuildLog;
        const date = new Date(2021, 10, 3);

        expect(isLastLogFromYesterday(lastLog, date)).toEqual(false);
    });
});
