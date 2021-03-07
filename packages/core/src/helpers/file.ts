import { access, mkdir, readFile, writeFile } from 'fs/promises';
import { PluginOptions } from '../model/plugin-options';

export const createLogDirectoryIfItDoesntExist = async (pluginOptions: PluginOptions) => {
    try {
        await access(pluginOptions.logsDirectoryName);
    } catch {
        await mkdir(pluginOptions.logsDirectoryName);
    }
};

export const readLogs = async <T>(filename: string): Promise<T[]> => {
    try {
        const fileContents = await readFile(`${filename}.json`);
        return JSON.parse(fileContents.toString());
    } catch {
        await writeFile(`${filename}.json`, JSON.stringify([]));
        return [];
    }
};

export const writeLogs = async <T>(filename: string, logs: T[]): Promise<void> => {
    try {
        await writeFile(`${filename}.json`, JSON.stringify(logs));
    } catch (error) {
        console.error(`There was an issue while writing file ${filename}.json`, error);
    }
};
