import fs from 'fs';
import { readLogs, createLogDirectoryIfItDoesntExist } from './file';
import { defaultOptions } from '../model/plugin-options';

describe('file helper functions', () => {
    it('creates directory to store logs if it does not exists', async () => {
        fs.promises.access = jest.fn().mockImplementation(() => {
            throw new Error();
        });
        const writeDirectorySpy = spyOn(fs.promises, 'mkdir').and.returnValue(() => Promise.resolve());

        await createLogDirectoryIfItDoesntExist(defaultOptions);

        expect(writeDirectorySpy).toHaveBeenCalledTimes(1);
        expect(writeDirectorySpy).toHaveBeenCalledWith(defaultOptions.logsDirectoryName);
    });
    it('skips creating a logs directory if it already exists', async () => {
        fs.promises.access = jest.fn().mockReturnValue(Promise.resolve());
        const writeDirectorySpy = spyOn(fs.promises, 'mkdir').and.returnValue(() => Promise.resolve());

        await createLogDirectoryIfItDoesntExist(defaultOptions);

        expect(writeDirectorySpy).toHaveBeenCalledTimes(0);
    });
    it('creates log file if it does not exists and returns an empty log', async () => {
        const fileName = 'test-log';

        fs.promises.readFile = jest.fn().mockImplementation(() => {
            throw new Error();
        });
        const writeFileSpy = spyOn(fs.promises, 'writeFile').and.returnValue(() => Promise.resolve());

        const logs = await readLogs(fileName);

        expect(writeFileSpy).toHaveBeenCalledTimes(1);
        expect(writeFileSpy).toHaveBeenCalledWith(`${fileName}.json`, '[]');
        expect(logs.length).toEqual(0);
    });
    it('reads logs from file', async () => {
        const fileName = 'test-log';

        fs.promises.readFile = jest.fn().mockReturnValue(Promise.resolve(`[{"a": 1}]`));
        const writeFileSpy = spyOn(fs.promises, 'writeFile').and.returnValue(() => Promise.resolve());

        const logs = await readLogs(fileName);

        expect(logs.length).toEqual(1);
        expect(writeFileSpy).toHaveBeenCalledTimes(0);
    });
});
