export interface PluginOptions {
    projectName: string;
    logsDirectoryName?: string;
    summaryLogFilename?: string;
}

export const defaultOptions: PluginOptions = {
    projectName: '',
    logsDirectoryName: 'stats',
    summaryLogFilename: 'build-stats-summary',
};
