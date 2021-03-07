import { BuildLog } from '../model/log';

export const formatDate = (date: Date): string => {
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
};

export const isLastLogFromYesterday = (lastLog: BuildLog, currentDate: Date): boolean => {
    return lastLog.date !== formatDate(currentDate);
};
