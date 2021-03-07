export interface BuildLog {
    date: string;
    dateISO: string;
    timestamp: number;
    buildTime: number;
    projectName: string;
}

export interface BuildStatisticsLog {
    projectName: string;
    date: string;
    totalBuildTime: number;
    buildsCount: number;
    meanBuildTime: number;
    medianBuildTime: number;
    slowestBuildTime: number;
    fastestBuildTime: number;
}
