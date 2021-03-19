import { Compiler, Stats } from 'webpack';
import { collectBuildStatistics, PluginOptions } from '@statistics-plugin/core';

const isWebpack5 = (stats: Stats): boolean => {
    return stats.compilation !== undefined && stats.compilation.endTime !== undefined;
}

export default class BuildStatisticsPlugin {
    constructor(private options: PluginOptions) {}

    apply(compiler: Compiler) {
        compiler.hooks.done.tap('Build Statistics Plugin', async (stats: Stats) => {
            const buildTime = isWebpack5(stats) ?
                stats.compilation.endTime - stats.compilation.startTime
                : stats.endTime - stats.startTime;
            await collectBuildStatistics(buildTime, this.options);
        });
    }
}

export { PluginOptions };
