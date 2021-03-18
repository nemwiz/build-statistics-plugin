import { Compiler, Stats } from 'webpack';
import { collectBuildStatistics, PluginOptions } from '@statistics-plugin/core';

export default class BuildStatisticsPlugin {
    constructor(private options: PluginOptions) {}

    apply(compiler: Compiler) {
        compiler.hooks.done.tap('Build Statistics Plugin', async (stats: Stats) => {

            console.log('testiiiing');
            const buildTime = stats.compilation.endTime - stats.compilation.startTime;
            await collectBuildStatistics(buildTime, this.options);
        });
    }
}

export { PluginOptions };
