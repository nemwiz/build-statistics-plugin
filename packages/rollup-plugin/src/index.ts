import { collectBuildStatistics, PluginOptions } from '@statistics-plugin/core';

export default function buildStatistics(options: PluginOptions) {
    let buildStartTime: Date;
    return {
        name: 'rollup-plugin-build-statistics',
        options() {
            buildStartTime = new Date();
        },
        async closeBundle() {
            const buildTime = new Date().valueOf() - buildStartTime.valueOf();
            await collectBuildStatistics(buildTime, options);
        },
    };
}

export { PluginOptions };
