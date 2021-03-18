## Rollup build statistics plugin

Plugin that keeps a continuous log of your build time.

### Use cases

- Can be used as an evidence to show the business (PO's etc.) how slow build times impact the team and hinder
  productivity
- By monitoring build time you can see if the optimizations in your Webpack config have really improved productivity

## Installation and setup

To install the plugin run:

`npm install --save-dev rollup-plugin-build-statistics`

Add the plugin to your `rollup.config.js` and specify a project name.

```js
import buildStatistics from 'rollup-plugin-build-statistics';

export default {
    input: `./src/index.js`,
    output: {
        file: `dist/index.js`,
    },
    plugins: [
        buildStatistics({
            projectName: 'dummy-project',
        }),
    ],
};
```

You are all set! 🚀

Now every time you make some changes the build time will be logged.

All logs will be summarized on daily basis and you can find the data under `stats/build-summary.json` file.

