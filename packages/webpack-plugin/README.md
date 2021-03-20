## Webpack build statistics plugin

Plugin that keeps a continuous log of your build time.

### Use cases

- Can be used as an evidence to show the business (PO's etc.) how slow build times impact the team and hinder productivity
- By monitoring build time you can see if the optimizations in your Webpack config have really improved productivity
- This plugin can help you to point out the differences between different machines e.g. if one of the developers has really slower builds than other it can be a sign of misconfiguration, poor hardware etc.

## Installation and setup

To install the plugin run:

`npm install --save-dev webpack-plugin-build-statistics`

Add the plugin to your `webpack.config` and specify a project name.

```js
const path = require('path');
const BuildStatisticsPlugin = require('webpack-plugin-build-statistics');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new BuildStatisticsPlugin({ projectName: 'dummy-project' })
    ]
};
```

You are all set! 🚀

Now every time you make some changes the build time will be logged.

All logs will be summarized on daily basis and you can find the data under `stats/build-summary.json` file.

NOTE: You should probably `gitignore` the `stats` folder and all json files inside.

## Plugin options

This plugin is configurable and supports a few options.


| Option name        | Required           | Default value  |   Description        |
|:-------------:|:-------------:|:-----:|:-------------|
| `projectName`      | Yes | N/A | Name of your project. It will be saved in the log file. Useful when you have multiple projects. |
| `logsDirectoryName`      | No |   `stats` | Name of the directory where log files will be stored. |
| `summaryLogFilename` | No | `build-stats-summary` | Name of the json log file. |
